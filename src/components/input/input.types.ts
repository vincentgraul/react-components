import type { ReactNode } from "react";

export type InputType = "text" | "password";

export type InputColors = {
	info: string;
	focus: string;
	success: string;
	error: string;
	warning: string;
};

export type InputIcons = {
	info: ReactNode;
	success: ReactNode;
	error: ReactNode;
	warning: ReactNode;
};

export type InputStatus = "info" | "success" | "warning" | "error";
