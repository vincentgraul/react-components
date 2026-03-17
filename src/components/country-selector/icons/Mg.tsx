import * as React from "react";
import type { SVGProps } from "react";
const SvgMg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 336" {...props}>
    <g fill="none">
      <path fill="#FF4B55" d="M512 168H167.724V.276h335.448A8.829 8.829 0 0 1 512 9.104V168z" />
      <path
        fill="#73AF00"
        d="M167.724 168H512v158.897a8.829 8.829 0 0 1-8.828 8.828H167.724V168z"
      />
      <path
        fill="#F5F5F5"
        d="M167.724.275v335.449H8.828A8.829 8.829 0 0 1 0 326.896V9.103A8.829 8.829 0 0 1 8.828.275h158.896z"
      />
    </g>
  </svg>
);
export default SvgMg;
