import React from "react";
import { InputGroup, Form } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import styled from "styled-components";

interface SearchInputProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  width?: string;
  height?: string;
}

const SearchCustomInput: React.FC<SearchInputProps> = ({
  placeholder = "Search",
  onChange,
  value,
  width = "100%", // Default value for width
  height = "auto", // Default value for height
}) => {
  return (
    <StyledInputGroup width={width} height={height}>
      <StyledInputGroupText>
        <CiSearch size={24} className="search-icon" />
      </StyledInputGroupText>
      <StyledFormControl
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </StyledInputGroup>
  );
};

export default SearchCustomInput;

const StyledInputGroup = styled(InputGroup)<{ width: string; height: string }>`
  border: 1px solid #bdbdbd;
  border-radius: 7px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const StyledInputGroupText = styled(InputGroup.Text)`
  background: #ffffff;
  border: none;
`;

const StyledFormControl = styled(Form.Control)`
  background: #ffffff;
  border: none;
  &:focus {
    box-shadow: none;
    border: none;
    outline: none;
  }
`;
