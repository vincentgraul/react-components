import React, { ForwardedRef, forwardRef, RefObject } from "react";
import ObjectLiteral from "@vincentgraul/types/src/ObjectLiteral";
import useVisible from "./useVisible";
import mountReactHook from "../mount-react-hook/mountReactHook";

describe("useVisible", () => {
  let observeSpy: jest.SpyInstance;
  let unobserveSpy: jest.SpyInstance;

  const Visible = forwardRef((props: ObjectLiteral, ref: ForwardedRef<HTMLElement>) =>
    props.children(useVisible(ref as RefObject<HTMLElement>)),
  );

  beforeAll(() => {
    observeSpy = jest.spyOn(window.IntersectionObserver.prototype, "observe");
    unobserveSpy = jest.spyOn(window.IntersectionObserver.prototype, "unobserve");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should observe when element exists", () => {
    const ref = { current: <div>Test</div> };

    mountReactHook(Visible, { ref, options: { once: true } });

    expect(observeSpy).toHaveBeenCalledTimes(1);
  });

  it("should not observe element when element doesn't exists", () => {
    mountReactHook(Visible, { options: { once: true } });

    expect(observeSpy).toHaveBeenCalledTimes(0);
  });

  it("should unobserve when element exists", () => {
    const ref = { current: <div>Test</div> };
    const { unmount } = mountReactHook(Visible, { ref, options: { once: true } });

    unmount();

    expect(unobserveSpy).toHaveBeenCalledTimes(1);
  });

  it("should not unobserve when element doesn't exists", () => {
    const { unmount } = mountReactHook(Visible, { options: { once: true } });

    unmount();

    expect(unobserveSpy).toHaveBeenCalledTimes(0);
  });
});
