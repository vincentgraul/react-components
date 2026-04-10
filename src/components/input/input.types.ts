import type { ReactNode } from "react";

export type InputType = "text" | "password";

export type InputColors = {
	default: string;
	focus: string;
	success: string;
	error: string;
	warning: string;
};

export type InputIcons = {
	default: ReactNode;
	success: ReactNode;
	error: ReactNode;
	warning: ReactNode;
};

export type InputStatus = "default" | "success" | "warning" | "error";
