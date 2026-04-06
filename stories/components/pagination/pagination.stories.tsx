import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowBigLeft, ArrowBigLeftDash, ArrowBigRight, ArrowBigRightDash } from "lucide-react";
import { expect } from "storybook/test";
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
		maxRecordsPerPage: 5,
		totalRecords: 15,
	},
	play: async ({ canvas, userEvent }) => {
		const items = canvas.queryAllByRole("button", { name: /^Page/ });

		// Initial state

		await expect(items).toHaveLength(3);

		await expect(items[0]).toHaveAttribute("aria-current", "page");
		await expect(items[1]).not.toHaveAttribute("aria-current");
		await expect(items[2]).not.toHaveAttribute("aria-current");

		await expect(canvas.getByRole("button", { name: "Next page" })).toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "Last page" })).toBeInTheDocument();
		await expect(canvas.queryByRole("button", { name: "Previous page" })).not.toBeInTheDocument();
		await expect(canvas.queryByRole("button", { name: "First page" })).not.toBeInTheDocument();

		// Navigate to next page

		await userEvent.click(canvas.getByRole("button", { name: "Next page" }));

		await expect(items[1]).toHaveAttribute("aria-current", "page");
		await expect(canvas.getByRole("button", { name: "Next page" })).toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "Last page" })).toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "Previous page" })).toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "First page" })).toBeInTheDocument();

		// Navigate to last page

		await userEvent.click(canvas.getByRole("button", { name: "Last page" }));

		await expect(items[2]).toHaveAttribute("aria-current", "page");
		await expect(canvas.queryByRole("button", { name: "Next page" })).not.toBeInTheDocument();
		await expect(canvas.queryByRole("button", { name: "Last page" })).not.toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "Previous page" })).toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "First page" })).toBeInTheDocument();

		// Navigate to previous page

		await userEvent.click(canvas.getByRole("button", { name: "Previous page" }));

		await expect(items[1]).toHaveAttribute("aria-current", "page");
		await expect(canvas.getByRole("button", { name: "Next page" })).toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "Last page" })).toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "Previous page" })).toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "First page" })).toBeInTheDocument();

		// Navigate to first page

		await userEvent.click(canvas.getByRole("button", { name: "First page" }));

		await expect(items[0]).toHaveAttribute("aria-current", "page");
		await expect(canvas.getByRole("button", { name: "Next page" })).toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "Last page" })).toBeInTheDocument();
		await expect(canvas.queryByRole("button", { name: "Previous page" })).not.toBeInTheDocument();
		await expect(canvas.queryByRole("button", { name: "First page" })).not.toBeInTheDocument();

		// Navigate to specific page

		await userEvent.click(canvas.getByRole("button", { name: "Page 2" }));

		await expect(items[1]).toHaveAttribute("aria-current", "page");
		await expect(canvas.getByRole("button", { name: "Next page" })).toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "Last page" })).toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "Previous page" })).toBeInTheDocument();
		await expect(canvas.getByRole("button", { name: "First page" })).toBeInTheDocument();
	},
};

export const WithOnePage: Story = {
	args: {
		totalRecords: 5,
	},
	play: async ({ canvas }) => {
		const items = canvas.queryAllByRole("button", { name: /^Page/ });
		await expect(items).toHaveLength(1);
		await expect(items[0]).toHaveAttribute("aria-current", "page");
		await expect(canvas.queryByRole("button", { name: "Next page" })).not.toBeInTheDocument();
		await expect(canvas.queryByRole("button", { name: "Last page" })).not.toBeInTheDocument();
		await expect(canvas.queryByRole("button", { name: "Previous page" })).not.toBeInTheDocument();
		await expect(canvas.queryByRole("button", { name: "First page" })).not.toBeInTheDocument();
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
