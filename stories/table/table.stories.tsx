import { useState, useEffect, PropsWithChildren } from "react";
import { Table, Column, Th, Td, Tr, usePagination, Pagination, ArrowPosition } from "../../src";

export default {
  title: "Table",
  component: Table,
};

const columns: Column[] = [
  { name: "firstname", label: "Firstname" },
  { name: "lastname", label: "Lastname" },
  { name: "age", label: "Age" },
  { name: "sex", label: "Sex" },
];

const records = [
  { lastname: "Dupont", firstname: "Jean", sex: "M", age: 28 },
  { firstname: "Bernard", lastname: "Durant", age: 43, sex: "M" },
];

export const Basic = () => {
  return <Table columns={columns} records={records} />;
};

export const WithUnknownColumn = () => {
  const records = [
    { lastname: "Dupont", firstname: "Jean", city: "Paris", sex: "M", age: 28 },
    { firstname: "Bernard", lastname: "Durant", age: 43, sex: "M", country: "France" },
  ];

  return <Table columns={columns} records={records} />;
};

export const WithCustomColumnsRow = () => {
  return (
    <Table columns={columns} records={records} renderColumnsRow={(columns) => <Tr>{columns}</Tr>} />
  );
};

export const WithCustomColumnsCell = () => {
  return (
    <Table
      columns={columns}
      records={records}
      renderColumnsCell={(columns, key) => <Th key={key}>- {columns.name} -</Th>}
    />
  );
};

export const WithCustomRecordsRow = () => {
  return (
    <Table
      columns={columns}
      records={records}
      renderRecordsRow={(cells, key) => <Tr key={key}>{cells}</Tr>}
    />
  );
};

export const WithCustomRecordsCell = () => {
  return (
    <Table
      columns={columns}
      records={records}
      renderRecordsCell={(cell, key) => <Td key={key}>* {cell} *</Td>}
    />
  );
};

export const WithDefaultRecordsEmptyCell = () => {
  const records = [
    { lastname: "Dupont", firstname: "Jean", age: 28 },
    { lastname: "Durant", age: 43, sex: "M" },
  ];

  return <Table columns={columns} records={records} />;
};

export const WithCustomRecordsEmptyCell = () => {
  const records = [
    { lastname: "Dupont", firstname: "Jean", age: 28 },
    { lastname: "Durant", age: 43, sex: "M" },
  ];

  return (
    <Table
      columns={columns}
      records={records}
      renderRecordsEmptyCell={(key: string) => <Td key={key}>-</Td>}
    />
  );
};

export const WithHeader = () => {
  return (
    <Table
      columns={columns}
      records={records}
      renderHeader={() => (
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
      )}
    />
  );
};

export const WithFooter = () => {
  return (
    <Table
      columns={columns}
      records={records}
      renderFooter={() => (
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            marginTop: "2vw",
            padding: "0.2vw 1.5vw",
          }}
        >
          Total: {records.length} records
        </div>
      )}
    />
  );
};

export const WithNoRecords = () => {
  const Block = ({ children }: PropsWithChildren) => (
    <div style={{ backgroundColor: "black", color: "white", padding: "0.2vw 1.5vw" }}>
      {children}
    </div>
  );

  return (
    <Table
      columns={columns}
      records={[]}
      renderHeader={() => <Block>Users data</Block>}
      renderFooter={() => <Block>Coypright 1990 - 2021</Block>}
      renderNoRecords={() => <div style={{ margin: "2vw 0", textAlign: "center" }}>No data</div>}
    />
  );
};

export const Advanced = () => {
  const [advancedTotalRecords, setAdvancedTotalRecords] = useState(records);
  const [advancedRecords, setAdvancedRecords] = useState<typeof records>([]);
  const pagination = usePagination({ page: 1, totalRecords: advancedTotalRecords.length });

  const handleAddRecord = () => {
    setAdvancedTotalRecords([...advancedTotalRecords, advancedTotalRecords[0]]);
  };

  useEffect(() => {
    const offset = (pagination.page - 1) * pagination.maxRecordsPerPage;
    setAdvancedRecords(advancedTotalRecords.slice(offset, offset + pagination.maxRecordsPerPage));
  }, [advancedTotalRecords, pagination.page]);

  const Block = ({ children }: PropsWithChildren) => (
    <div
      style={{ backgroundColor: "black", color: "white", padding: "1vw 0", textAlign: "center" }}
    >
      {children}
    </div>
  );

  return (
    <Table
      columns={columns}
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
            renderSingleArrow={(position: ArrowPosition) => (
              <img
                style={{ minWidth: 0, minHeight: 0, width: "0.5rem" }}
                src={
                  position === ArrowPosition.LEFT
                    ? require("./assets/single-left-arrow.svg")
                    : require("./assets/single-right-arrow.svg")
                }
              />
            )}
            renderDoubleArrow={(position: ArrowPosition) => (
              <img
                style={{ minWidth: 0, minHeight: 0, width: "0.8rem" }}
                src={
                  position === ArrowPosition.LEFT
                    ? require("./assets/double-left-arrow.svg")
                    : require("./assets/double-right-arrow.svg")
                }
              />
            )}
          />
        </Block>
      )}
    />
  );
};
