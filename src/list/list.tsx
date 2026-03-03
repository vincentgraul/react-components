import { ReactNode } from "react";
import styles from "./list.module.css";
import clsx from "clsx";

export type ListItemProps = {
  icon: ReactNode;
  text: string;
  textSize?: number;
  textColor?: string;
  textWeight?: 400 | 500 | 600 | 700 | 800 | 900;
  gap?: number;
  className?: string;
};

export const ListItem = ({
  className,
  icon,
  text,
  textSize,
  textColor,
  textWeight,
  gap,
}: ListItemProps) => {
  return (
    <li className={clsx(styles.item, className)} style={{ gap: `${gap ?? 0.3}rem` }}>
      {icon}
      <span
        style={{
          fontSize: `${textSize ?? 1}rem`,
          color: textColor,
          fontWeight: textWeight ?? 400,
        }}
      >
        {text}
      </span>
    </li>
  );
};

export type ListProps = {
  children: ReactNode;
  gap?: number;
  className?: string;
};

export const List = ({ className, children, gap }: ListProps) => (
  <ul className={clsx(styles.list, className)} style={{ gap: `${gap ?? 0.5}rem` }}>
    {children}
  </ul>
);
