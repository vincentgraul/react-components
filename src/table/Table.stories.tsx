import React, { ReactNode } from "react";
import Table, { Column, UI } from "./Table";

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

export const Basic = () => {
  const records = [
    { sex: "M", lastname: "Jacques", firstname: "Jean" },
    { firstname: "Bernard", lastname: "Paul" },
  ];

  return (
    <Table
      columns={columns}
      records={records}
      renderHeader={() => <div>Header</div>}
      renderFooter={() => <div>Footer</div>}
      renderColumn={(column: Column, key: string) => <UI.Column key={key}>{column.name}</UI.Column>}
      renderRow={(cell: ReactNode, key: string) => <UI.Row key={key}>{cell}</UI.Row>}
    />
  );
};
