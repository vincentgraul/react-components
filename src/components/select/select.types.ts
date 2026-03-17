import { ReactNode } from "react";

export type SelectOption = {
  id: number;
  label: string | ReactNode;
  value: string;
};

export type SelectOptionWithoutId = Omit<SelectOption, "id">;
