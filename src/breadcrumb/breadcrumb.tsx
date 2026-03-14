import { Fragment, ReactNode } from "react";
import clsx from "clsx";
import styles from "./breadcrumb.module.css";
import ArrowRightIcon from "./assets/arrow-right.svg?react";
import { useBreadcrumb } from "./use-breadcrumb";
import type { BreadcrumbType, BreadcrumbElementType } from "./breadcrumb.types";
import { toPx } from "../utils";

export type BreadcrumbProps = BreadcrumbType & {
  onClick: (element: BreadcrumbElementType) => void;
  icon?: ReactNode;
  iconWidth?: number;
  className?: string;
};

export const Breadcrumb = ({
  className,
  onClick,
  icon,
  iconWidth = 50,
  url,
  mapping,
}: BreadcrumbProps) => {
  const elements: BreadcrumbElementType[] = useBreadcrumb({ url, mapping });

  return (
    <div className={clsx(styles.container, className)}>
      {elements.map((element: BreadcrumbElementType, index: number) => (
        <Fragment key={element.label}>
          <a className={styles.link} onClick={() => onClick(element)}>
            {element.label}
          </a>

          {index < elements.length - 1 && (
            <>
              {icon ?? (
                <ArrowRightIcon
                  className={styles.arrow}
                  style={{ width: toPx(iconWidth) }}
                ></ArrowRightIcon>
              )}
            </>
          )}
        </Fragment>
      ))}
    </div>
  );
};
