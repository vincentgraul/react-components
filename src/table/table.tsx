import React, { ReactNode, PropsWithChildren } from "react";
import styles from "./table.module.css";
import { Column } from "./table.types";

type Props<T> = {
  columns: Column[];
  records: T[];
  renderHeader?: () => ReactNode;
  renderFooter?: () => ReactNode;
  renderColumnsRow?: (columns: ReactNode) => ReactNode;
  renderColumnsCell?: (column: Column, key: string) => ReactNode;
  renderRecordsRow?: (cells: ReactNode, key: string) => ReactNode;
  renderRecordsCell?: (cell: Primitive, key: string) => ReactNode;
  renderRecordsEmptyCell?: (key: string) => ReactNode;
  renderNoRecords?: () => ReactNode;
};

/**
 * React component used to display a data table.
 * @public
 * @param props - An Object which contains:
 * - columns: the table columns
 * - records: the table records
 * - some properties to customise the rendering
 * @returns A React component.
 */
export const Table = <T,>({
  columns,
  records,
  renderHeader = () => null,
  renderFooter = () => null,
  renderColumnsRow = (columns: ReactNode) => <tr>{columns}</tr>,
  renderColumnsCell = (column: Column, key: string) => <Th key={key}>{column.name}</Th>,
  renderRecordsRow = (cells: ReactNode, key: string) => <Tr key={key}>{cells}</Tr>,
  renderRecordsCell = (cell: Primitive, key: string) => <Td key={key}>{cell}</Td>,
  renderRecordsEmptyCell = (key: string) => <Td key={key}>X</Td>,
  renderNoRecords = () => null,
}: Props<T>) => {
  const displayColumns = () =>
    renderColumnsRow(
      columns.map((column: Column, index: number) => renderColumnsCell(column, `column-${index}`)),
    );

  const displayRows = () => {
    const columnNames: string[] = columns.map((column: Column) => column.name);

    return records.map((record: T, rowIndex: number) => {
      const cells: Primitive[] = columnNames.map((name: string) => (record as ObjectLiteral)[name]);

      return renderRecordsRow(
        cells.map((cell: Primitive, cellIndex: number) =>
          cell
            ? renderRecordsCell(cell, `cell-${cellIndex}`)
            : renderRecordsEmptyCell(`cell-${cellIndex}`),
        ),
        `row-${rowIndex}`,
      );
    });
  };

  return (
    <div className={styles.container}>
      {renderHeader()}

      {records.length === 0 ? (
        renderNoRecords()
      ) : (
        <>
          <table className={styles.main}>
            <thead>{displayColumns()}</thead>
            <tbody className={styles.tbody}>{displayRows()}</tbody>
          </table>
        </>
      )}

      {renderFooter()}
    </div>
  );
};

export const Th = ({ children }: PropsWithChildren) => <th className={styles.th}>{children}</th>;
export const Tr = ({ children }: PropsWithChildren) => <tr className={styles.tr}>{children}</tr>;
export const Td = ({ children }: PropsWithChildren) => <th className={styles.td}>{children}</th>;
