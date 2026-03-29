import { ReactNode, PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./table.module.css";
import { Column } from "./table.types";
import { ObjectLiteral, Primitive } from "./table.types";

export type TableProps<T extends ObjectLiteral> = {
  columns: Column[];
  records: T[];
  uniqueKey?: string;
  renderHeader?: () => ReactNode;
  renderFooter?: () => ReactNode;
  renderColumnsRow?: (columns: ReactNode) => ReactNode;
  renderColumnsCell?: (column: Column, key: string) => ReactNode;
  renderRecordsRow?: (cells: ReactNode, key: string) => ReactNode;
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
  renderColumnsRow = (columns: ReactNode) => <tr>{columns}</tr>,
  renderColumnsCell = (column: Column, key: string) => <Th key={key}>{column.name}</Th>,
  renderRecordsRow = (cells: ReactNode, key: string) => <Tr key={key}>{cells}</Tr>,
  renderRecordsCell = (cell: Primitive, key: string) => <Td key={key}>{cell}</Td>,
  renderRecordsEmptyCell = (key: string) => <Td key={key}>X</Td>,
  renderNoRecords = () => null,
}: TableProps<T>) => {
  const displayColumns = () =>
    renderColumnsRow(
      columns.map((column: Column) => renderColumnsCell(column, `column-${column.name}`)),
    );

  const displayRows = () => {
    const columnNames = columns.map((column) => column.name);

    return records.map((record, index) => {
      const rowKey = uniqueKey ? record[uniqueKey] : index;

      return renderRecordsRow(
        columnNames.map((name) => {
          const cell = record[name];
          const cellKey = `row-${rowKey}-cell-${name}`;
          return cell ? renderRecordsCell(cell, cellKey) : renderRecordsEmptyCell(cellKey);
        }),
        `row-${rowKey}`,
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
          <thead>{displayColumns()}</thead>
          <tbody className={styles.tbody}>{displayRows()}</tbody>
        </table>
      )}

      {renderFooter()}
    </div>
  );
};

export const Th = ({ children }: PropsWithChildren) => <th className={styles.th}>{children}</th>;
export const Tr = ({ children }: PropsWithChildren) => <tr className={styles.tr}>{children}</tr>;
export const Td = ({ children }: PropsWithChildren) => <td className={styles.td}>{children}</td>;
