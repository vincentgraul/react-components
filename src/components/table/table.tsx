import clsx from "clsx";
import type { PropsWithChildren, ReactNode } from "react";
import styles from "./table.module.css";
import type { Column, ObjectLiteral, Primitive } from "./table.types";

export type TableProps<T extends ObjectLiteral> = {
	columns: Column[];
	records: T[];
	uniqueKey?: string;
	renderHeader?: () => ReactNode;
	renderFooter?: () => ReactNode;
	renderColumnsCell?: (column: Column, key: string) => ReactNode;
	renderRecordsCell?: (cell: Primitive, key: string) => ReactNode;
	renderRecordsEmptyCell?: (key: string) => ReactNode;
	renderNoRecords?: () => ReactNode;
	className?: string;
};

export const Table = <T extends ObjectLiteral>({
	className,
	columns,
	records,
	uniqueKey,
	renderHeader = () => null,
	renderFooter = () => null,
	renderColumnsCell = (column: Column, key: string) => <Th key={key}>{column.label}</Th>,
	renderRecordsCell = (cell: Primitive, key: string) => <Td key={key}>{cell}</Td>,
	renderRecordsEmptyCell = (key: string) => <Td key={key}>X</Td>,
	renderNoRecords = () => null,
}: TableProps<T>) => {
	const renderColumns = () => (
		<tr>{columns.map((column: Column) => renderColumnsCell(column, `column-${column.name}`))}</tr>
	);

	const renderRows = () => {
		const columnNames = columns.map((column) => column.name);

		return records.map((record, index) => {
			const rowKey = uniqueKey ? record[uniqueKey] : index;

			return (
				<Tr key={`row-${rowKey}`}>
					{columnNames.map((name) => {
						const cell = record[name];
						const cellKey = `row-${rowKey}-cell-${name}`;
						return cell ? renderRecordsCell(cell, cellKey) : renderRecordsEmptyCell(cellKey);
					})}
				</Tr>
			);
		});
	};

	return (
		<div className={clsx(styles.container, className)}>
			{renderHeader()}

			{records.length === 0 ? (
				renderNoRecords()
			) : (
				<table className={styles.main}>
					<thead>{renderColumns()}</thead>
					<tbody className={styles.tbody}>{renderRows()}</tbody>
				</table>
			)}

			{renderFooter()}
		</div>
	);
};

export const Th = ({ children }: PropsWithChildren) => <th className={styles.th}>{children}</th>;
export const Tr = ({ children }: PropsWithChildren) => <tr className={styles.tr}>{children}</tr>;
export const Td = ({ children }: PropsWithChildren) => <td className={styles.td}>{children}</td>;
