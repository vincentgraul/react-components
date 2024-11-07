import * as React from "react";
import type { SVGProps } from "react";
const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="235 228 30 43" {...props}>
    <path
      d="M17.352 17.202 3.775 30.662a2.224 2.224 0 0 1-3.127 0 2.179 2.179 0 0 1 0-3.1l12.014-11.91L.648 3.742a2.18 2.18 0 0 1 0-3.1 2.225 2.225 0 0 1 3.127 0l13.578 13.46a2.175 2.175 0 0 1 0 3.1"
      style={{
        stroke: "none",
        strokeWidth: 1,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeDashoffset: 0,
        strokeLinejoin: "miter",
        strokeMiterlimit: 4,
        fill: "#fff",
        fillRule: "evenodd",
        opacity: 1,
      }}
      transform="translate(241 234.35)"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);
export default SvgArrow;
