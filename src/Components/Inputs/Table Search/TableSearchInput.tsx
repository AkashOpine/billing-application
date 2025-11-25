import React, { useEffect, useRef, useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { BiBarcodeReader } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import styled from "styled-components";

interface TableSearchProps {
  value?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  height?: string;
  borderColor?: string;
  isBarcode?: boolean;
  onBarcodeScan?: (barcode: string) => void;
}

const TableSearch: React.FC<TableSearchProps> = ({
  placeholder = "Search",
  value,
  onChange,
  width = "316px",
  height = "36px",
  borderColor = "#D0D0D0",
  isBarcode = false,
  onBarcodeScan,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleClose = () => {
  setIsExpanded(false);
  onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
};


  return (
    <SideSearchBar
      ref={containerRef}
      isExpanded={isExpanded}
      width={width}
      height={height}
    >
      {!isExpanded ? (
        <IconButton onClick={handleExpand}>
          <CiSearch size={22} color="#669292" />
        </IconButton>
      ) : (
        <InputGroup className="h-100">
          <StyledFormControl
            ref={inputRef}
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            borderColor={borderColor}
          />
          <StyledInputGroupText borderColor={borderColor}>
            {isBarcode && <BiBarcodeReader size={19} color="#A1A1A1" />}
            <CiSearch size={19} />
            <AiOutlineClose
              size={16}
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </StyledInputGroupText>
        </InputGroup>
      )}
    </SideSearchBar>
  );
};

export default TableSearch;

const SideSearchBar = styled.div<{
  isExpanded: boolean;
  width?: string;
  height?: string;
}>`
  display: flex;
  align-items: center;
  max-width: ${(props) => (props.isExpanded ? props.width : "40px")};
  height: ${(props) => props.height};
  transition: max-width 0.3s ease;
  overflow: hidden;
  position: relative;
`;

const IconButton = styled.button`
  background: #ffffff4d;
  border: 0.5px solid #b0b0b0;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StyledInputGroupText = styled(InputGroup.Text)<{ borderColor: string }>`
  display: flex;
  gap: 0.75rem;
  border-right: 0;
  background: #ffffff;
  color: #747474;
  border-radius: 4px;
  border: 0.5px solid ${(props) => props.borderColor};
`;

const StyledFormControl = styled(Form.Control)<{ borderColor: string }>`
  border-right: none !important;
  background: #ffffff;
  color: #000000;
  border-radius: 4px;
  border: 0.5px solid ${(props) => props.borderColor};
  font-size: 14px;
  font-weight: 300;
  line-height: 18.75px;
  &:focus {
    box-shadow: none;
    outline: none;
    border: 0.5px solid ${(props) => props.borderColor};
    color: #00000099;
    background: #ffffff;
  }
`;
