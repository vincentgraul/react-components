declare type ObjectLiteral = import("@vincentgraul/types/src/ObjectLiteral");
declare type Primitive = import("@vincentgraul/types/src/Primitive");

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
