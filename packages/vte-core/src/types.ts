/**
 * 深度只读类型
 */
export type DeepReadonly<T> = T extends (infer U)[]
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends Map<infer K, infer V>
    ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T;

/**
 * 将嵌套对象展平为点路径联合类型
 * 例如: { a: { b: { c: 1 } } } => "a" | "a.b" | "a.b.c"
 */
export type FlattenPaths<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? FlattenPaths<T[K], Prefix extends "" ? K : `${Prefix}.${K}`>
        : Prefix extends ""
          ? K
          : `${Prefix}.${K}`;
    }[keyof T & string]
  : never;

/**
 * Token 路径类型：从 token 定义中提取所有合法的点路径
 * 用于 IDE 自动补全 $token.path
 *
 * @example
 * const tokens = defineTokens({ semantic: { color: { primary: "#3b82f6" } } });
 * type Paths = TokenPath<typeof tokens>;
 * // "semantic" | "semantic.color" | "semantic.color.primary"
 *
 * // 在 Vue 组件中使用
 * type ValidPath = TokenPath<typeof import("./design-tokens").default>;
 * const path: ValidPath = "$semantic.color.primary"; // ✅
 */
export type TokenPath<T> = T extends object ? FlattenPaths<T> : never;

/**
 * Token 引用类型: {path.to.token}
 */
export type TokenRef<P extends string> = `{${P}}`;

/**
 * defineTokens 的输入类型约束
 * - 所有叶子值必须是 string
 * - 引用值必须符合 {path} 格式
 */
export type TokenDefinition<T> = {
  [K in keyof T]: T[K] extends string
    ? T[K] extends `{${string}}`
      ? T[K] // 引用类型保持原样
      : T[K] // 原始值
    : T[K] extends object
      ? TokenDefinition<T[K]>
      : never;
};

/**
 * defineTokens 返回类型：深度只读
 */
export type TokenConfig<T> = DeepReadonly<T>;
