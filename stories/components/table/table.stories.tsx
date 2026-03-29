import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, useEffect, PropsWithChildren } from "react";
import { Table, Th, Td, Tr, usePagination, Pagination } from "../../../src";
import DoubleLeftArrowIcon from "./assets/double-left-arrow.svg?react";
import DoubleRightArrowIcon from "./assets/double-right-arrow.svg?react";
import SingleLeftArrowIcon from "./assets/single-left-arrow.svg?react";
import SingleRightArrowIcon from "./assets/single-right-arrow.svg?react";

const meta = {
  component: Table,
  args: {
    columns: [
      { name: "firstname", label: "Firstname" },
      { name: "lastname", label: "Lastname" },
      { name: "age", label: "Age" },
      { name: "sex", label: "Sex" },
    ],
    records: [
      { lastname: "Dupont", firstname: "Jean", sex: "M", age: 28 },
      { firstname: "Bernard", lastname: "Durant", age: 43, sex: "M" },
    ],
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithUnknownColumn: Story = {
  args: {
    records: [
      { lastname: "Dupont", firstname: "Jean", city: "Paris", sex: "M", age: 28 },
      { firstname: "Bernard", lastname: "Durant", age: 43, sex: "M", country: "France" },
    ],
  },
};

export const WithDefaultRecordsEmptyCell: Story = {
  args: {
    records: [
      { lastname: "Dupont", firstname: "Jean", age: 28 },
      { lastname: "Durant", age: 43, sex: "M" },
    ],
  },
};

export const WithCustomColumnsRow: Story = {
  args: {
    renderColumnsRow: (columns) => <Tr>{columns}</Tr>,
  },
};

export const WithCustomColumnsCell: Story = {
  args: {
    renderColumnsCell: (columns, key) => <Th key={key}>- {columns.name} -</Th>,
  },
};

export const WithCustomRecordsRow: Story = {
  args: {
    renderRecordsRow: (cells, key) => <Tr key={key}>{cells}</Tr>,
  },
};

export const WithCustomRecordsCell: Story = {
  args: {
    renderRecordsCell: (cell, key) => <Td key={key}>* {cell} *</Td>,
  },
};

export const WithCustomRecordsEmptyCell: Story = {
  args: {
    records: [
      { lastname: "Dupont", firstname: "Jean", age: 28 },
      { lastname: "Durant", age: 43, sex: "M" },
    ],
    renderRecordsEmptyCell: (key) => <Td key={key}>-</Td>,
  },
};

export const WithHeader: Story = {
  args: {
    renderHeader: () => (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          marginBottom: "2vw",
          padding: "0.2vw 1.5vw",
        }}
      >
        Users data
      </div>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    renderFooter: () => (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          marginTop: "2vw",
          padding: "0.2vw 1.5vw",
        }}
      >
        Total: {meta.args.records.length} records
      </div>
    ),
  },
};

const Block = ({ children }: PropsWithChildren) => (
  <div style={{ backgroundColor: "black", color: "white", padding: "0.2vw 1.5vw" }}>{children}</div>
);

export const WithNoRecords: Story = {
  args: {
    records: [],
    renderHeader: () => <Block>Users data</Block>,
    renderFooter: () => <Block>Coypright 1990 - 2021</Block>,
    renderNoRecords: () => <div style={{ margin: "2vw 0", textAlign: "center" }}>No data</div>,
  },
};

export const Advanced: Story = {
  render: () => {
    const [advancedTotalRecords, setAdvancedTotalRecords] = useState(meta.args.records);
    const [advancedRecords, setAdvancedRecords] = useState<typeof meta.args.records>([]);
    const pagination = usePagination({ page: 1, totalRecords: advancedTotalRecords.length });

    const handleAddRecord = () => {
      setAdvancedTotalRecords([...advancedTotalRecords, advancedTotalRecords[0]]);
    };

    useEffect(() => {
      const offset = (pagination.page - 1) * pagination.maxRecordsPerPage;
      setAdvancedRecords(advancedTotalRecords.slice(offset, offset + pagination.maxRecordsPerPage));
    }, [advancedTotalRecords, pagination.page]);

    return (
      <Table
        columns={meta.args.columns}
        records={advancedRecords}
        renderHeader={() => (
          <Block>
            <button
              style={{ backgroundColor: "white", border: "none", width: "5vw", cursor: "pointer" }}
              onClick={handleAddRecord}
            >
              Add
            </button>
          </Block>
        )}
        renderFooter={() => (
          <Block>
            <Pagination
              {...pagination}
              renderSingleArrow={(position) =>
                position === "left" ? <SingleLeftArrowIcon /> : <SingleRightArrowIcon />
              }
              renderDoubleArrow={(position) =>
                position === "left" ? <DoubleLeftArrowIcon /> : <DoubleRightArrowIcon />
              }
            ></Pagination>
          </Block>
        )}
      />
    );
  },
};
