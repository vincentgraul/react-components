import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination, usePagination, type usePaginationProps } from "../../../src";
import ArrowLeftIcon from "./assets/arrow-left.svg?react";
import ArrowLeftDashIcon from "./assets/arrow-left-dash.svg?react";
import ArrowRightIcon from "./assets/arrow-right.svg?react";
import ArrowRightDashIcon from "./assets/arrow-right-dash.svg?react";

const PaginationWithHook = (props: usePaginationProps) => {
	const pagination = usePagination(props);
	return <Pagination {...pagination} />;
};

const meta = {
	component: PaginationWithHook,
} satisfies Meta<typeof PaginationWithHook>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		page: 1,
		totalRecords: 15,
	},
};

export const WithOnePage: Story = {
	args: {
		page: 1,
		totalRecords: 5,
	},
};

export const WithMultiplePages: Story = {
	args: {
		page: 1,
		totalRecords: 150,
	},
};

export const WithCustomArrows: Story = {
	args: {
		page: 1,
		totalRecords: 150,
	},
	render: () => {
		const pagination = usePagination({ page: 1, totalRecords: 150 });

		return (
			<Pagination
				{...pagination}
				renderSingleArrow={(position) =>
					position === "left" ? <ArrowLeftIcon /> : <ArrowRightIcon />
				}
				renderDoubleArrow={(position) =>
					position === "left" ? <ArrowLeftDashIcon /> : <ArrowRightDashIcon />
				}
			></Pagination>
		);
	},
};
