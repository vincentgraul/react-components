import React, { ReactNode } from "react";
import styled from "styled-components";

export interface Column {
  name: string;
  label: string;
  [field: string]: any;
}

export interface TableProps<T> {
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
  className?: string;
}

/**
 * React component used to display a data table.
 * @public
 * @param props - An Object which contains:
 * - columns: the table columns
 * - records: the table records
 * - some properties to customise the rendering
 * @returns A React component.
 */
export default function Table<T>(props: TableProps<T>): JSX.Element {
  const {
    columns,
    records,
    renderHeader = () => null,
    renderFooter = () => null,
    renderColumnsRow = (columns: ReactNode) => (
      <tr className="table-main-columns-row">{columns}</tr>
    ),
    renderColumnsCell = (column: Column, key: string) => (
      <Th className="table-main-columns-cell" key={key}>
        {column.name}
      </Th>
    ),
    renderRecordsRow = (cells: ReactNode, key: string) => (
      <Tr className="table-main-records-row" key={key}>
        {cells}
      </Tr>
    ),
    renderRecordsCell = (cell: Primitive, key: string) => (
      <Td className="table-main-records-cell" key={key}>
        {cell}
      </Td>
    ),
    renderRecordsEmptyCell = (key: string) => (
      <Td className="table-main-records-cell" key={key}>
        X
      </Td>
    ),
    renderNoRecords = () => null,
    className = "",
  } = props;

  const displayColumns = () =>
    renderColumnsRow(
      columns.map((column: Column, index: number) => renderColumnsCell(column, `column-${index}`))
    );

  const displayRows = () => {
    const columnNames: string[] = columns.map((column: Column) => column.name);

    return records.map((record: T, rowIndex: number) => {
      const cells: Primitive[] = columnNames.map((name: string) => (record as ObjectLiteral)[name]);

      return renderRecordsRow(
        cells.map((cell: Primitive, cellIndex: number) =>
          cell
            ? renderRecordsCell(cell, `cell-${cellIndex}`)
            : renderRecordsEmptyCell(`cell-${cellIndex}`)
        ),
        `row-${rowIndex}`
      );
    });
  };

  return (
    <Container className={`table ${className}`}>
      {renderHeader()}

      {records.length === 0 ? (
        renderNoRecords()
      ) : (
        <>
          <Main className="table-main">
            <thead className="table-main-columns">{displayColumns()}</thead>
            <TBody className="table-main-records">{displayRows()}</TBody>
          </Main>
        </>
      )}

      {renderFooter()}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
`;

const Main = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
`;

const TBody = styled.tbody`
  user-select: text;
  tr:last-child {
    border: none;
  }
`;

export const Th = styled.th`
  padding: 2rem 1rem 1rem 0;
  word-wrap: break-word;
  white-space: nowrap;
`;

export const Tr = styled.tr`
  text-align: center;
  border-bottom: 2px solid black;
`;

export const Td = styled.td`
  padding: 2rem 1rem 1rem 0;
  word-wrap: break-word;
`;
