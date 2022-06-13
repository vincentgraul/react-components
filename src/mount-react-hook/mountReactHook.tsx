import React, { ComponentType } from "react";
import { render } from "@testing-library/react";

export interface MountedHook {
  container: HTMLElement;
  unmount: () => void;
  value: ObjectLiteral | Primitive;
}

/**
 * React hook to mount a hook in an unit test.
 * @public
 * @param Component - The component to be tested.
 * @param props - Props passed to the component.
 * @returns The component, the value it returns and a function to unmount the component.
 */
export default function mountReactHook(
  Component: ComponentType,
  props: ObjectLiteral = {}
): MountedHook {
  let value: ObjectLiteral | Primitive = null;

  const { container, unmount } = render(
    <Component {...props}>
      {(hookValue: ObjectLiteral | Primitive) => {
        value = hookValue;
        return null;
      }}
    </Component>
  );

  return { container, unmount, value };
}
