import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./breadcrumb.module.css";
import ArrowRightIcon from "./assets/arrow-right.svg?react";
import { useBreadcrumb, useBreadcrumbProps } from "./use-breadcrumb";
import type { BreadcrumbItem } from "./breadcrumb.types";
import { toPx, toRem } from "../../utils";

export type BreadcrumbProps = {
  config: useBreadcrumbProps;
  onClick: (element: BreadcrumbItem) => void;
  color?: string;
  fontSize?: number;
  icon?: ReactNode;
  iconWidth?: number;
  iconMargin?: number;
  className?: string;
};

export const Breadcrumb = ({
  config,
  onClick,
  icon,
  iconWidth = 50,
  iconMargin = 1,
  color,
  fontSize = 2,
  className,
}: BreadcrumbProps) => {
  const items: BreadcrumbItem[] = useBreadcrumb(config);

  return (
    <nav aria-label="breadcrumb" className={clsx(styles.container, className)}>
      <ol className={styles["list-item"]}>
        {items.map((item, index) => (
          <li key={item.url} className={styles.item}>
            <a
              className={styles.link}
              onClick={() => onClick(item)}
              style={{ color, fontSize: toRem(fontSize) }}
              href={item.url}
            >
              {item.label}
            </a>

            {index < items.length - 1 && (
              <span aria-hidden>
                {icon ?? (
                  <ArrowRightIcon
                    style={{
                      width: toPx(iconWidth),
                      marginLeft: toRem(iconMargin),
                      marginRight: toRem(iconMargin),
                    }}
                  />
                )}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
