import clsx from "clsx";
import { type ChangeEvent, type DragEvent, useEffect, useMemo, useRef, useState } from "react";
import type { BorderStyle, FontWeight, Size } from "../../types";
import { isNumber, toPercentage, toPx, toRem } from "../../utils";
import TrashIcon from "./assets/trash.svg";
import UserIcon from "./assets/user.svg";
import styles from "./drop-zone.module.css";

export type DropZoneProps = {
	onFileChanged: (file: File | undefined) => void;
	label?: string;
	labelFontSize?: number;
	labelFontWeight?: FontWeight;
	labelGap?: number;
	previewIcon?: string;
	previewIconWidth?: number;
	removeIcon?: string;
	removeIconWidth?: number;
	text?: string;
	textFontSize?: number;
	textFontWeight?: FontWeight;
	width?: Size;
	height?: Size;
	gap?: number;
	padding?: string;
	borderWidth?: number;
	borderColor?: string;
	borderStyle?: BorderStyle;
	removeAriaLabel?: string;
	className?: string;
};

type NoFileProps = Pick<
	DropZoneProps,
	"previewIcon" | "previewIconWidth" | "text" | "textFontSize" | "textFontWeight"
>;
const NoFile = ({
	previewIcon,
	previewIconWidth = 50,
	text,
	textFontSize = 1,
	textFontWeight = 400,
}: NoFileProps) => (
	<>
		<img
			alt="previous icon"
			className={styles["preview-icon"]}
			src={previewIcon ?? UserIcon}
			style={{ width: toPx(previewIconWidth) }}
		></img>
		{text && (
			<p
				className={styles.text}
				style={{ fontSize: toRem(textFontSize), fontWeight: textFontWeight }}
			>
				{text}
			</p>
		)}
	</>
);

type WithFileProps = {
	preview: string;
};
const WithFile = ({ preview }: WithFileProps) =>
	preview && <img alt="preview file" className={styles["preview-file"]} src={preview}></img>;

export const DropZone = ({
	onFileChanged,
	label,
	labelFontSize = 1,
	labelFontWeight = 400,
	labelGap = 1,
	previewIcon,
	previewIconWidth,
	removeIcon,
	removeIconWidth = 50,
	text,
	textFontSize,
	textFontWeight,
	width = 100,
	height = "auto",
	gap = 1,
	padding,
	borderWidth = 5,
	borderColor,
	borderStyle,
	removeAriaLabel,
	className,
}: DropZoneProps) => {
	const [file, setFile] = useState<File>();
	const [isDragging, setIsDragging] = useState(false);
	const preview = useMemo(() => (file ? URL.createObjectURL(file) : undefined), [file]);
	const fileRef = useRef<HTMLInputElement>(null);

	const handleOnClick = () => {
		fileRef.current?.click();
	};

	const handleOnDrop = (event: DragEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const file = event.dataTransfer.files[0];
		setFile(file);
		setIsDragging(false);
		onFileChanged(file);
	};

	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { target } = event;

		if (target?.files && target?.files.length > 0) {
			const file = target.files[0];
			setFile(file);
			onFileChanged(file);
		}
	};

	const handleOnRemove = () => {
		setFile(undefined);
		onFileChanged(undefined);

		if (fileRef.current) {
			fileRef.current.value = "";
		}
	};

	const handleOnDragOver = (event: DragEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setIsDragging(true);
	};

	useEffect(() => {
		return () => {
			if (preview) {
				URL.revokeObjectURL(preview);
			}
		};
	}, [preview]);

	return (
		<div
			className={clsx(styles.container, className)}
			style={{
				width: isNumber(width) ? toPercentage(width) : width,
				height: isNumber(height) ? toPx(height) : height,
				gap: toRem(labelGap),
			}}
		>
			{label && (
				<div
					className={styles.label}
					style={{ fontSize: toRem(labelFontSize), fontWeight: labelFontWeight }}
				>
					{label}
				</div>
			)}
			<button
				type="button"
				className={clsx(styles["drop-zone"], isDragging && styles["drop-zone--dragging"])}
				onClick={handleOnClick}
				onDrop={handleOnDrop}
				onDragOver={handleOnDragOver}
				onDragLeave={() => setIsDragging(false)}
				style={{
					gap: toRem(gap),
					padding,
					borderWidth: toPx(borderWidth),
					borderStyle,
					borderColor,
				}}
			>
				{preview ? (
					<WithFile preview={preview} />
				) : (
					<NoFile {...{ previewIcon, previewIconWidth, text, textFontSize, textFontWeight }} />
				)}
			</button>

			{file && (
				<button
					type="button"
					className={styles["remove-button"]}
					onClick={handleOnRemove}
					aria-label={removeAriaLabel ?? "Remove uploaded picture"}
				>
					<img
						className={styles["remove-icon"]}
						src={removeIcon ?? TrashIcon}
						alt=""
						style={{ width: toPx(removeIconWidth) }}
					></img>
				</button>
			)}

			<input ref={fileRef} type="file" onChange={handleOnChange} hidden></input>
		</div>
	);
};
