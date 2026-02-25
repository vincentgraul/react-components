import { Fragment } from "react";
import clsx from "clsx";
import styles from "./breadcrumb.module.css";
import { Arrow } from "./icons";
import { useBreadcrumb, BreadcrumbType, BreadcrumbElementType } from "..";

export type BreadcrumbProps = BreadcrumbType & {
  onClick: (element: BreadcrumbElementType) => void;
  className?: string;
};

export const Breadcrumb = (props: BreadcrumbProps) => {
  const { className, url, mapping, onClick } = props;
  const elements: BreadcrumbElementType[] = useBreadcrumb({ url, mapping });

  return (
    <div className={clsx(styles.container, className)}>
      {elements.map((element: BreadcrumbElementType, index: number) => {
        return (
          <Fragment key={element.label}>
            <a className={styles.link} onClick={() => onClick(element)}>
              {element.label}
            </a>

            {index < elements.length - 1 ? <Arrow className={styles.arrow} /> : null}
          </Fragment>
        );
      })}
    </div>
  );
};
