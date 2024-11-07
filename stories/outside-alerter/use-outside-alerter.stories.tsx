import { useRef } from "react";
import { useOutsideAlerter } from "../../src";

export default {
  title: "useOutsideAlerter",
  component: useOutsideAlerter,
};

export const Basic = () => {
  const ref = useRef(null);
  const { hasClickedOutside } = useOutsideAlerter(ref);

  return (
    <div>
      <p>Has clicked outside: {hasClickedOutside.toString()}</p>
      <p ref={ref}>Click on the text</p>
    </div>
  );
};
