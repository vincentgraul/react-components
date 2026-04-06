import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { type BreadcrumbItem, useBreadcrumb, type useBreadcrumbProps } from "../..";
import { toPx, toRem } from "../../utils";
import styles from "./breadcrumb.module.css";

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
						<button
							type="button"
							className={styles.link}
							onClick={() => onClick(item)}
							style={{ color, fontSize: toRem(fontSize) }}
						>
							{item.label}
						</button>

						{index < items.length - 1 && (
							<span aria-hidden>
								{icon ?? (
									<ChevronRight
										role="img"
										className={styles.icon}
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
