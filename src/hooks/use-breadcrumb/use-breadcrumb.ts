import type { BreadcrumbItem } from "./use-breadcrumb.types";

export type useBreadcrumbProps = {
	url?: URL;
	mapping?: {
		path: string;
		label: string;
	}[];
};

export const useBreadcrumb = ({
	url = new URL(location.href),
	mapping,
}: useBreadcrumbProps): BreadcrumbItem[] => {
	const paths = url.pathname.split("/").slice(1);
	let previousPath = "";

	return paths.map((path) => {
		const label = mapping?.find(({ path: mappingPath }) => path === mappingPath)?.label ?? path;
		const currentPath = `${previousPath}/${path}`;
		previousPath = currentPath;
		return { label, url: currentPath };
	});
};
