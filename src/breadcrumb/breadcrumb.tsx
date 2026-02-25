import { Fragment } from "react";
import clsx from "clsx";
import styles from "./breadcrumb.module.css";
import ArrowRightIcon from "./assets/arrow-right.svg";
import { useBreadcrumb } from "./use-breadcrumb";
import type { BreadcrumbType, BreadcrumbElementType } from "./breadcrumb.types";

export type BreadcrumbProps = BreadcrumbType & {
  onClick: (element: BreadcrumbElementType) => void;
  icon?: string;
  iconSize?: number;
  className?: string;
};

export const Breadcrumb = ({
  className,
  onClick,
  icon,
  iconSize,
  url,
  mapping,
}: BreadcrumbProps) => {
  const elements: BreadcrumbElementType[] = useBreadcrumb({ url, mapping });

  return (
    <div className={clsx(styles.container, className)}>
      {elements.map((element: BreadcrumbElementType, index: number) => {
        return (
          <Fragment key={element.label}>
            <a className={styles.link} onClick={() => onClick(element)}>
              {element.label}
            </a>

            {index < elements.length - 1 ? (
              <img
                className={styles.arrow}
                src={icon ?? ArrowRightIcon}
                style={{ width: `${iconSize ?? 50}px` }}
              />
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
};
