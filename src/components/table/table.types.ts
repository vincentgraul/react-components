export type Column = {
  name: string;
  label: string;
};

export type Primitive = string | number | boolean | undefined | null;

export type ObjectLiteral<T = Primitive> = {
  [field: string]: T;
};
