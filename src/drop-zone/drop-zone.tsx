import { useRef, ChangeEvent, useState, DragEvent, useMemo, useEffect } from "react";
import clsx from "clsx";
import styles from "./drop-zone.module.css";
import UserIcon from "./assets/user.svg";
import TrashIcon from "./assets/trash.svg";

type DropZoneProps = {
  onFileChanged: (file: File | undefined) => void;
  label?: string;
  labelSize?: number;
  labelGap?: number;
  previewIcon?: string;
  previewIconSize?: number;
  removeIcon?: string;
  removeIconSize?: number;
  text?: string;
  textSize?: number;
  width?: number;
  height?: number;
  gap?: number;
  padding?: string;
  borderSize?: number;
  borderColor?: string;
  borderStyle?: "solid" | "dashed" | "dotted" | "double";
  removeAriaLabel?: string;
  className?: string;
};

type NoFileProps = Pick<DropZoneProps, "previewIcon" | "previewIconSize" | "text" | "textSize">;
const NoFile = ({ previewIcon, previewIconSize, text, textSize }: NoFileProps) => (
  <>
    <img
      className={styles["preview-icon"]}
      src={previewIcon ?? UserIcon}
      style={{ width: `${previewIconSize ?? 50}px` }}
    ></img>
    {text && (
      <p className={styles.text} style={{ fontSize: `${textSize ?? 1}rem` }}>
        {text}
      </p>
    )}
  </>
);

type WithFileProps = {
  preview: string;
};
const WithFile = ({ preview }: WithFileProps) =>
  preview && <img className={styles["preview-file"]} src={preview}></img>;

export const DropZone = ({
  onFileChanged,
  label,
  labelSize,
  labelGap,
  previewIcon,
  previewIconSize,
  removeIcon,
  removeIconSize,
  text,
  textSize,
  width,
  height,
  gap,
  padding,
  borderSize,
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

  const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
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

  const handleOnDragOver = (event: DragEvent<HTMLDivElement>) => {
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
        width: `${width ?? 100}%`,
        height: height !== undefined ? `${height}px` : "auto",
        gap: `${labelGap ?? 1}rem`,
      }}
    >
      {label && (
        <div className={styles.label} style={{ fontSize: `${labelSize ?? 1}rem` }}>
          {label}
        </div>
      )}
      <div
        className={clsx(styles["drop-zone"], isDragging && styles["drop-zone--dragging"])}
        onClick={handleOnClick}
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        onDragLeave={() => setIsDragging(false)}
        style={{
          gap: `${gap ?? 1}rem`,
          padding,
          borderWidth: `${borderSize ?? 5}px`,
          borderStyle,
          borderColor,
        }}
      >
        {preview ? (
          <WithFile preview={preview} />
        ) : (
          <NoFile {...{ previewIcon, previewIconSize, text, textSize }} />
        )}
      </div>

      {file && (
        <button
          className={styles["remove-button"]}
          onClick={handleOnRemove}
          aria-label={removeAriaLabel ?? "Remove uploaded picture"}
        >
          <img
            className={styles["remove-icon"]}
            src={removeIcon ?? TrashIcon}
            alt=""
            style={{ width: `${removeIconSize ?? 50}px` }}
          ></img>
        </button>
      )}

      <input ref={fileRef} type="file" onChange={handleOnChange} hidden></input>
    </div>
  );
};
