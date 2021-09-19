import React, { ReactNode } from "react";
import styled from "styled-components";

export * as UI from "./UI";

export interface Column {
  name: string;
  label: string;
  [field: string]: any;
}

export interface Props<T> {
  columns: Column[];
  records: T[];
  renderHeader?: () => ReactNode;
  renderFooter?: () => ReactNode;
  renderColumn?: (column: Column, key: string) => ReactNode;
  renderRow?: (cell: ReactNode, key: string) => ReactNode;
  renderEmptyCell?: () => ReactNode;
  renderNoRecords?: () => ReactNode;
  className?: string;
}

export default function Table<T>(props: Props<T>): JSX.Element {
  const {
    columns,
    records,
    renderHeader = () => null,
    renderFooter = () => null,
    renderColumn = () => null,
    renderRow = () => null,
    renderEmptyCell = () => null,
    renderNoRecords = () => null,
    className,
  } = props;

  const formatRow = (record: T, columnNames: string[]): ReactNode => {
    const row: Primitive[] = columnNames.map((name: string) => (record as ObjectLiteral)[name]);
    return (
      <>
        {row.map((cell: Primitive, index: number) => (
          <Cell key={`cell-${index}`}>{cell ? cell : renderEmptyCell()}</Cell>
        ))}
      </>
    );
  };

  const displayColumns = () =>
    columns.map((column: Column, index: number) => renderColumn(column, `column-${index}`));

  const displayRows = () => {
    const columnNames = columns.map((column: Column) => column.name);
    return records.map((record: T, index: number) =>
      renderRow(formatRow(record, columnNames), `row-${index}`)
    );
  };

  return (
    <Container className={className}>
      {renderHeader()}

      {records.length === 0 ? (
        renderNoRecords()
      ) : (
        <>
          <T>
            <thead>
              <tr>{displayColumns()}</tr>
            </thead>

            <TBody>{displayRows()}</TBody>
          </T>
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

const T = styled.table`
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

const Cell = styled.td`
  padding: 2rem 1rem 1rem 0;
  word-wrap: break-word;
`;
