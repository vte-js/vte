import { templates, type TokenTemplate } from "../data/templates";

export function useTokenTemplates() {
  function getTemplates(): TokenTemplate[] {
    return templates;
  }

  function getTemplate(id: string): TokenTemplate | undefined {
    return templates.find((t) => t.id === id);
  }

  return { getTemplates, getTemplate };
}
