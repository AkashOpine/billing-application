import React, { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";
import { MdDelete, MdEdit, MdUpload } from "react-icons/md";

interface UploadBoxProps {
  $isActive: boolean;
}
const UploadContainer = styled.div``;

const Label = styled.label`
  font-size: 15 px;
  font-weight: 400;
  color: #7c7c7c;
  display: block;
  margin-bottom: 8px;
`;

const UploadBox = styled.label<UploadBoxProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isActive }) =>
    $isActive ? "space-between" : "center"};
  padding: 12px 35px;
  border: 1px dashed #0539f4;
  background-color: #0539f412;
  color: #0539f4;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 400;
  font-size: 12px;
  transition: background-color 0.2s ease;
  gap: 8px;

  &:hover {
    background-color: #e0e7ff;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;
const FileInfo = styled.div`
  flex: 1;
  margin: 0 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;
const FileDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;
interface FileUploaderProps {
  id: string;
  label?: string;
  acceptedFileTypes?: string;
  onFileSelect: (file: File | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  id,
  label = "Upload File",
  acceptedFileTypes = ".pdf,.jpg,.jpeg,.png",
  onFileSelect,
}) => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCurrentFile(file);
    onFileSelect(file);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentFile(null);
    onFileSelect(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    inputRef.current?.click();
  };

  return (
    <UploadContainer>
      {label && <Label>{label}</Label>}
      {!currentFile ? (
        <UploadBox
          $isActive={false}
          onClick={() => inputRef.current?.click()}
        >
          <MdUpload /> {label}
        </UploadBox>
      ) : (
        <UploadBox $isActive={true}>
          <FileDisplay onClick={(e) => e.stopPropagation()}>
            <MdUpload />
            <FileInfo title={currentFile.name}>{currentFile.name}</FileInfo>
            <Actions onClick={(e) => e.stopPropagation()}>
              <MdEdit onClick={handleEdit} style={{ cursor: "pointer" }} />
              <MdDelete onClick={handleDelete} style={{ cursor: "pointer" }} />
            </Actions>
          </FileDisplay>
        </UploadBox>
      )}
      <HiddenInput
        ref={inputRef}
        id={id}
        type="file"
        accept={acceptedFileTypes}
        onChange={handleFileChange}
      />
    </UploadContainer>
  );
};



export default FileUploader;
