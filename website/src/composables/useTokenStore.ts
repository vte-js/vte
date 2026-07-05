import { ref, reactive, watch } from "vue";

export interface TokenNode {
  name: string;
  path: string;
  value: string;
  children: Record<string, TokenNode>;
  isReference: boolean;
}

export interface TokenValue {
  path: string;
  value: string;
  raw: string;
  refs: string[];
}

const STORAGE_KEY = "vte-configurator-state";

function createEmptyTree() {
  return { primitive: {} as Record<string, TokenNode>, semantic: {} as Record<string, TokenNode>, component: {} as Record<string, TokenNode> };
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

const tree = reactive(loadFromStorage() || createEmptyTree());
const activePath = ref<string | null>(null);
const activeLayer = ref<"primitive" | "semantic" | "component">("primitive");
const searchQuery = ref("");
const tokenMapVersion = ref(0);

// tokenMap as a ref that we manually update
const tokenMap = ref<Map<string, TokenValue>>(new Map());
const allPaths = ref<string[]>([]);
const filteredPaths = ref<string[]>([]);

function rebuildTokenMap() {
  const map = new Map<string, TokenValue>();

  function walk(nodes: Record<string, TokenNode>, prefix: string) {
    for (const key in nodes) {
      const node = nodes[key];
      const path = prefix ? `${prefix}.${key}` : key;
      if (node.children && Object.keys(node.children).length > 0) {
        walk(node.children, path);
      } else {
        const isRef = /^\{.+\}$/.test(node.value);
        map.set(path, {
          path,
          value: isRef ? "" : node.value,
          raw: node.value,
          refs: isRef ? [node.value.slice(1, -1)] : [],
        });
      }
    }
  }

  walk(tree.primitive, "primitive");
  walk(tree.semantic, "semantic");
  walk(tree.component, "component");

  // Resolve references
  for (let round = 0; round < 10; round++) {
    let resolved = 0;
    for (const [, token] of map) {
      if (token.refs.length > 0 && token.value === "") {
        const refToken = map.get(token.refs[0]);
        if (refToken && refToken.value !== "") {
          token.value = refToken.value;
          resolved++;
        }
      }
    }
    if (resolved === 0) break;
  }

  tokenMap.value = map;
  allPaths.value = Array.from(map.keys());
  updateFilteredPaths();
}

function updateFilteredPaths() {
  if (!searchQuery.value) {
    filteredPaths.value = allPaths.value;
  } else {
    const q = searchQuery.value.toLowerCase();
    filteredPaths.value = allPaths.value.filter((p) => p.toLowerCase().includes(q));
  }
}

watch(searchQuery, updateFilteredPaths);

// Save to localStorage on changes
let saveTimer: ReturnType<typeof setTimeout> | null = null;
function saveToStorage() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(tree)), 500);
}

// Initial build
rebuildTokenMap();

function addToken(layer: string, path: string, value: string = "") {
  const relativePath = path.startsWith(layer + ".") ? path.slice(layer.length + 1) : path;
  const parts = relativePath.split(".");
  let current: any = tree[layer as keyof typeof tree];
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) {
      current[parts[i]] = { name: parts[i], path: `${layer}.${parts.slice(0, i + 1).join(".")}`, value: "", children: {}, isReference: false };
    }
    current = current[parts[i]].children;
  }
  const leaf = parts[parts.length - 1];
  current[leaf] = { name: leaf, path: `${layer}.${relativePath}`, value, children: {}, isReference: /^\{.+\}$/.test(value) };
  rebuildTokenMap();
  saveToStorage();
}

function removeToken(layer: string, path: string) {
  const relativePath = path.startsWith(layer + ".") ? path.slice(layer.length + 1) : path;
  const parts = relativePath.split(".");
  let current: any = tree[layer as keyof typeof tree];
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) return;
    current = current[parts[i]].children;
  }
  delete current[parts[parts.length - 1]];
  rebuildTokenMap();
  saveToStorage();
}

function updateTokenValue(layer: string, path: string, value: string) {
  // path = "primitive.blue.500", layer = "primitive"
  // Remove the layer prefix from path to get the tree-relative path
  const relativePath = path.startsWith(layer + ".") ? path.slice(layer.length + 1) : path;
  const parts = relativePath.split(".");
  let current: any = tree[layer as keyof typeof tree];
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) return;
    current = current[parts[i]].children;
  }
  const node = current[parts[parts.length - 1]];
  if (node) {
    node.value = value;
    node.isReference = /^\{.+\}$/.test(value);
    rebuildTokenMap();
    saveToStorage();
  }
}

function loadTemplate(tokens: any) {
  Object.keys(tree.primitive).forEach(k => delete tree.primitive[k]);
  Object.keys(tree.semantic).forEach(k => delete tree.semantic[k]);
  Object.keys(tree.component).forEach(k => delete tree.component[k]);

  function copyNodes(source: any, target: Record<string, TokenNode>, parentPath: string = "") {
    for (const key in source) {
      const val = source[key];
      const path = parentPath ? `${parentPath}.${key}` : key;
      if (typeof val === "string") {
        target[key] = { name: key, path, value: val, children: {}, isReference: /^\{.+\}$/.test(val) };
      } else if (typeof val === "object" && val !== null) {
        target[key] = { name: key, path, value: "", children: {}, isReference: false };
        copyNodes(val, target[key].children, path);
      }
    }
  }

  if (tokens.primitive) copyNodes(tokens.primitive, tree.primitive, "primitive");
  if (tokens.semantic) copyNodes(tokens.semantic, tree.semantic, "semantic");
  if (tokens.component) copyNodes(tokens.component, tree.component, "component");
  rebuildTokenMap();
  saveToStorage();
}

function clearAll() {
  Object.keys(tree.primitive).forEach(k => delete tree.primitive[k]);
  Object.keys(tree.semantic).forEach(k => delete tree.semantic[k]);
  Object.keys(tree.component).forEach(k => delete tree.component[k]);
  activePath.value = null;
  rebuildTokenMap();
  saveToStorage();
}

function importTokens(newTree: any) {
  loadTemplate(newTree);
}

function getLayerNodes(layer: string): Record<string, TokenNode> {
  return (tree as any)[layer] || {};
}

function getLayerCount(layer: string): number {
  let count = 0;
  function walk(nodes: Record<string, TokenNode>) {
    for (const key in nodes) {
      const node = nodes[key];
      if (node.children && Object.keys(node.children).length > 0) {
        walk(node.children);
      } else {
        count++;
      }
    }
  }
  walk(getLayerNodes(layer));
  return count;
}

export function useTokenStore() {
  return {
    tree,
    activePath,
    activeLayer,
    searchQuery,
    tokenMap,
    allPaths,
    filteredPaths,
    addToken,
    removeToken,
    updateTokenValue,
    loadTemplate,
    clearAll,
    importTokens,
    getLayerNodes,
    getLayerCount,
  };
}
