import React, { ComponentType } from "react";
import { render } from "@testing-library/react";
import { MountedHook } from "./mount-react-hook.types";

/**
 * React hook to mount a hook in an unit test.
 * @public
 * @param Component - The component to be tested.
 * @param props - Props passed to the component.
 * @returns The component, the value it returns and a function to unmount the component.
 */
export const mountReactHook = (
  Component: ComponentType,
  props: ObjectLiteral = {},
): MountedHook => {
  let value: ObjectLiteral | Primitive = null;

  const { container, unmount } = render(
    <Component {...props}>
      {(hookValue: ObjectLiteral | Primitive) => {
        value = hookValue;
        return null;
      }}
    </Component>,
  );

  return { container, unmount, value };
};
