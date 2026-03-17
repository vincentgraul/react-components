import type { Meta, StoryObj } from "@storybook/react-vite";
import { usePagination, Pagination, usePaginationProps } from "../../../src";
import DoubleLeftArrowIcon from "./assets/double-left-arrow.svg?react";
import DoubleRightArrowIcon from "./assets/double-right-arrow.svg?react";
import SingleLeftArrowIcon from "./assets/single-left-arrow.svg?react";
import SingleRightArrowIcon from "./assets/single-right-arrow.svg?react";

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
          position === "left" ? <SingleLeftArrowIcon /> : <SingleRightArrowIcon />
        }
        renderDoubleArrow={(position) =>
          position === "left" ? <DoubleLeftArrowIcon /> : <DoubleRightArrowIcon />
        }
      ></Pagination>
    );
  },
};
