import type { Meta, StoryObj } from "@storybook/react-vite";
import { type PropsWithChildren, useState } from "react";
import { expect } from "storybook/test";
import { Pagination, Table, Td, Th, usePagination } from "../../../src";

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

export const Basic: Story = {
	play: async ({ canvas }) => {
		await expect(canvas.queryAllByRole("columnheader")).toHaveLength(4);
		await expect(canvas.queryAllByRole("row")).toHaveLength(3);
	},
};

export const WithUnknownColumn: Story = {
	args: {
		records: [
			{ lastname: "Dupont", firstname: "Jean", city: "Paris", sex: "M", age: 28 },
			{ firstname: "Bernard", lastname: "Durant", age: 43, sex: "M", country: "France" },
		],
	},
	play: async ({ canvas }) => {
		await expect(canvas.queryByText("city")).not.toBeInTheDocument();
		await expect(canvas.queryByText("Paris")).not.toBeInTheDocument();
	},
};

export const WithDefaultRecordsEmptyCell: Story = {
	args: {
		records: [
			{ lastname: "Dupont", firstname: "Jean", age: 28 },
			{ lastname: "Durant", age: 43, sex: "M" },
		],
	},
	play: async ({ canvas }) => {
		await expect(canvas.queryAllByText("X")).toHaveLength(2);
	},
};

export const WithCustomColumnsCell: Story = {
	args: {
		renderColumnsCell: (columns, key) => <Th key={key}>- {columns.label} -</Th>,
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByText("- Firstname -")).toBeInTheDocument();
	},
};

export const WithCustomRecordsCell: Story = {
	args: {
		renderRecordsCell: (cell, key) => <Td key={key}>* {cell} *</Td>,
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByText("* Jean *")).toBeInTheDocument();
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
	play: async ({ canvas }) => {
		await expect(canvas.queryAllByText("-")).toHaveLength(2);
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
	play: async ({ canvas }) => {
		await expect(canvas.getByText("Users data")).toBeInTheDocument();
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
	play: async ({ canvas }) => {
		expect(canvas.getByText(`Total: ${meta.args.records.length} records`)).toBeInTheDocument();
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
	play: async ({ canvas }) => {
		await expect(canvas.queryByRole("table")).not.toBeInTheDocument();
		await expect(canvas.getByText("No data")).toBeInTheDocument();
	},
};

export const Advanced: Story = {
	render: () => {
		const [advancedRecords, setAdvancedRecords] = useState<typeof meta.args.records>(
			meta.args.records,
		);
		const pagination = usePagination({ page: 1, totalRecords: advancedRecords.length });

		const handleAddRecord = () => {
			setAdvancedRecords([...advancedRecords, advancedRecords[0]]);
		};

		return (
			<Table
				columns={meta.args.columns}
				records={advancedRecords}
				renderHeader={() => (
					<Block>
						<button
							type="button"
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
							itemColor="black"
							itemBackgroundColor="white"
							itemActiveBackgroundColor="#7F00FF"
							itemHoverBackgroundColor="grey"
						></Pagination>
					</Block>
				)}
			/>
		);
	},
};
