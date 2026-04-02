import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowBigLeft, ArrowBigLeftDash, ArrowBigRight, ArrowBigRightDash } from "lucide-react";
import { Pagination, usePagination, type usePaginationProps } from "../../../src";

const PaginationWithHook = (props: usePaginationProps) => {
	const pagination = usePagination(props);
	return <Pagination {...pagination} />;
};

const meta = {
	component: PaginationWithHook,
	args: {
		page: 1,
	},
} satisfies Meta<typeof PaginationWithHook>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		totalRecords: 15,
	},
};

export const WithOnePage: Story = {
	args: {
		totalRecords: 5,
	},
};

export const WithMultiplePages: Story = {
	args: {
		totalRecords: 150,
	},
};

export const WithCustomArrows: Story = {
	args: {
		totalRecords: 150,
	},
	render: () => {
		const pagination = usePagination({ page: 1, totalRecords: 150 });

		return (
			<Pagination
				{...pagination}
				renderSingleArrow={(position) =>
					position === "left" ? <ArrowBigLeft /> : <ArrowBigRight />
				}
				renderDoubleArrow={(position) =>
					position === "left" ? <ArrowBigLeftDash /> : <ArrowBigRightDash />
				}
				ariaLabelPage={(page: number) => `Page numéro ${page}`}
			></Pagination>
		);
	},
};
