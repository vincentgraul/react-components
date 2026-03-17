export type MountedHook = {
  container: HTMLElement;
  unmount: () => void;
  value: ObjectLiteral | Primitive;
};
