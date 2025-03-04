export type NestedKeyOf<T> = T extends object
  ? {
      [K in Extract<keyof T, string>]: T[K] extends object
        ? `${K}.${NestedKeyOf<T[K]>}` | K
        : K;
    }[Extract<keyof T, string>]
  : never;
export type NestedWithSubKeys<
  T,
  B extends NestedKeyOf<T>
> = T extends `${infer First}.${infer Second}`
  ? First extends keyof T
    ? Second extends NestedKeyOf<T[First]>
      ? NestedWithSubKeys<T[First], Second>
      : never
    : never
  : B extends keyof T
  ? T[B]
  : never;
