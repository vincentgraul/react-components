import React, { Fragment } from "react";
import { useBreadcrumb } from "./use-breadcrumb";
import { Arrow } from "./icons";
import { BreadcrumbType, BreadcrumbElementType } from "./breadcrumb.types";
import styles from "./breadcrumb.module.css";

type Props = BreadcrumbType & {
  onClick: (element: BreadcrumbElementType) => void;
};

export const Breadcrumb = (props: Props) => {
  const { url, mapping, onClick } = props;
  const elements: BreadcrumbElementType[] = useBreadcrumb({ url, mapping });

  return (
    <div className={styles.container}>
      {elements.map((element: BreadcrumbElementType, index: number) => {
        return (
          <Fragment key={index}>
            <a className={styles.link} onClick={() => onClick(element)}>
              {element.label}
            </a>

            {index < elements.length - 1 ? <Arrow className={styles.arrow} /> : null}
          </Fragment>
        );
      })}
      ;
    </div>
  );
};
