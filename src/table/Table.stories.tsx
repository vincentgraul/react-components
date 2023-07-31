import React, { useState, useEffect } from "react";
import Table, { Column, Th, Td, Tr } from "./Table";
import usePagination from "../pagination/usePagination";
import styled from "styled-components";
import NumberedPagination, { ArrowPosition } from "../numbered-pagination/NumberedPagination";

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
  const CustomColumnRow = styled.tr`
    background-color: black;
    color: white;
  `;

  return (
    <Table
      columns={columns}
      records={records}
      renderColumnsRow={(columns) => <CustomColumnRow>{columns}</CustomColumnRow>}
    />
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
  const CustomRecordsRow = styled(Tr)`
    border-color: red;
  `;

  return (
    <Table
      columns={columns}
      records={records}
      renderRecordsRow={(cells, key) => <CustomRecordsRow key={key}>{cells}</CustomRecordsRow>}
    />
  );
};

export const WithCustomRecordsCell = () => {
  return (
    <Table
      columns={columns}
      records={records}
      renderRecordsCell={(cell, key) => <Th key={key}>* {cell} *</Th>}
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
  const Header = styled.div`
    background-color: black;
    color: white;
    margin-bottom: 2vw;
    padding: 0.2vw 1.5vw;
  `;

  return (
    <Table columns={columns} records={records} renderHeader={() => <Header>Users data</Header>} />
  );
};

export const WithFooter = () => {
  const Footer = styled.div`
    background-color: black;
    color: white;
    margin-top: 2vw;
    padding: 0.2vw 1.5vw;
  `;

  return (
    <Table
      columns={columns}
      records={records}
      renderFooter={() => <Footer>Total: {records.length} records</Footer>}
    />
  );
};

export const WithNoRecords = () => {
  const Block = styled.div`
    background-color: black;
    color: white;
    padding: 0.2vw 1.5vw;
  `;

  const NoRecords = styled.div`
    margin: 2vw 0;
    text-align: center;
  `;

  return (
    <Table
      columns={columns}
      records={[]}
      renderHeader={() => <Block>Users data</Block>}
      renderFooter={() => <Block>Coypright 1990 - 2021</Block>}
      renderNoRecords={() => <NoRecords>No data</NoRecords>}
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

  const Block = styled.div`
    background-color: black;
    color: white;
    padding: 1vw 0;
    text-align: center;
  `;

  const Button = styled.button`
    background-color: white;
    border: none;
    width: 5vw;
    cursor: pointer;
  `;

  const Pagination = styled(NumberedPagination)`
    display: inline-flex;

    .pagination-item:hover:not(.selected) {
      background-color: lightgrey;
      color: black;
    }

    .selected {
      background-color: white;
      color: black;
    }
  `;

  const SingleArrow = styled.img`
    min-width: 0;
    min-height: 0;
    width: 0.5rem;
  `;

  const DoubleArrow = styled.img`
    min-width: 0;
    min-height: 0;
    width: 0.8rem;
  `;

  return (
    <Table
      columns={columns}
      records={advancedRecords}
      renderHeader={() => (
        <Block>
          <Button onClick={handleAddRecord}>Add</Button>
        </Block>
      )}
      renderFooter={() => (
        <Block>
          <Pagination
            {...pagination}
            renderSingleArrow={(position: ArrowPosition) => (
              <SingleArrow
                src={
                  position === ArrowPosition.LEFT
                    ? require("../../stories/assets/pagination/single-left-arrow.svg")
                    : require("../../stories/assets/pagination/single-right-arrow.svg")
                }
              />
            )}
            renderDoubleArrow={(position: ArrowPosition) => (
              <DoubleArrow
                src={
                  position === ArrowPosition.LEFT
                    ? require("../../stories/assets/pagination/double-left-arrow.svg")
                    : require("../../stories/assets/pagination/double-right-arrow.svg")
                }
              />
            )}
          />
        </Block>
      )}
    />
  );
};
