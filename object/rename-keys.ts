export function renameKeys<
  TOldKey extends keyof T,
  TNewkey extends string,
  T extends Record<string, unknown>
>(keys: { [key: string]: TNewkey extends TOldKey ? never : TNewkey }, obj: T) {
  return Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keys[key] || key]: obj[key] },
    }),
    {}
  );
}
