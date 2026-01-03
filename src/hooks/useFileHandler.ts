import { ChangeEvent, useState } from "react";

type FileHandlerType = "single" | "multiple";

type FileState<T extends FileHandlerType> =
  T extends "multiple" ? File[] : File | null;

type PreviewState<T extends FileHandlerType> =
  T extends "multiple" ? string[] : string | null;

export const useFileHandler = <T extends FileHandlerType>(
  type: T,
  limitInMb = 5,
  maxFiles = 1
) => {
  const [file, setFile] = useState<FileState<T>>(
    (type === "multiple" ? [] : null) as FileState<T>
  );

  const [preview, setPreview] = useState<PreviewState<T>>(
    (type === "multiple" ? [] : null) as PreviewState<T>
  );

  const [error, setError] = useState<string | null>(null);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    if (type === "multiple" && selectedFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const validFiles: File[] = Array.from(selectedFiles).filter(
      (file) => file.size <= limitInMb * 1024 * 1024
    );

    if (validFiles.length !== selectedFiles.length) {
      setError(`Each file must be under ${limitInMb}MB`);
      return;
    }

    setError(null);

    if (type === "single") {
      setFile(validFiles[0] as FileState<T>);
      setPreview(URL.createObjectURL(validFiles[0]) as PreviewState<T>);
    } else {
      setFile(validFiles as FileState<T>);
      setPreview(
        validFiles.map((file) => URL.createObjectURL(file)) as PreviewState<T>
      );
    }
  };

  const clear = (): void => {
    setFile((type === "multiple" ? [] : null) as FileState<T>);
    setPreview((type === "multiple" ? [] : null) as PreviewState<T>);
    setError(null);
  };

  return { file, preview, error, changeHandler, clear };
};
