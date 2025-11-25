import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";

interface InputAutoProps {
  pholder: string;
  data: string[];
  onSelected: (value: string) => void;
  onChange: (value: string) => void;
  initialValue?: string;
  isRequired?: boolean;
  noOptionsMessage?: string;
  disabled?: boolean;
  noOptionButtonLabel?: string;
  onNoOptionClick?: (inputValue: string) => void;
  hideSuggestions?: boolean; // <-- new prop
  width?: string;
  height?: string;
}

const InputAuto: React.FC<InputAutoProps> = ({
  pholder,
  data,
  onSelected,
  onChange,
  initialValue = "",
  isRequired = false,
  noOptionsMessage = "No matching results",
  disabled = false,
  noOptionButtonLabel,
  onNoOptionClick,
  hideSuggestions,
  width,
  height,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(initialValue);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onChange(val);

    if (val.length >= 1 && !disabled) {
      const filtered = data.filter((item) =>
        item.toLowerCase().startsWith(val.toLowerCase())
      );
      setSuggestions(filtered);
      setIsDropdownOpen(true);
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    onSelected(value);
    setIsDropdownOpen(false);
  };

  return (
    <Wrapper>
      <InputWrapper>
        <Input
          placeholder={isRequired ? `${pholder} *` : pholder}
          value={inputValue}
          onChange={handleChange}
          required={isRequired}
          autoComplete="off"
          disabled={disabled}
          type="search"
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            const target = e.currentTarget;
            if (target.value === "") {
              setInputValue("");
              setSuggestions([]);
              setIsDropdownOpen(false);
              onChange(""); // Inform parent component that value is cleared
            }
          }}
        />
        <IconWrapper>
          <CiSearch size={20} />
        </IconWrapper>
      </InputWrapper>

      {!disabled && isDropdownOpen && !hideSuggestions && (
        <Dropdown>
          {suggestions.length > 0 ? (
            suggestions.map((item, index) => (
              <DropdownItem
                key={`${item}-${index}`}
                onClick={() => handleSelect(item)}
              >
                {item}
              </DropdownItem>
            ))
          ) : noOptionButtonLabel && onNoOptionClick ? (
            <div>
              <NoOptions>{noOptionsMessage}</NoOptions>
              <AddButton
                type="button"
                onClick={() => onNoOptionClick(inputValue)}
              >
                {noOptionButtonLabel}
              </AddButton>
            </div>
          ) : (
            ""
          )}
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default InputAuto;

// Styled Components
const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 14px;
`;

const Input = styled.input<{
  disabled?: boolean;
  width?: string;
  height?: string;
}>`
  width: 100%;
  height: ${(props) => props.height} || 40px;
  padding: 8px 12px;
  padding-right: 35px;
  font-size: 14px;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: ${({ disabled }) => (disabled ? "#e9ecef" : "#fff")};

  &:focus {
    outline: none;
    border-color: #3399ff;
    box-shadow: 0 0 4px rgba(51, 153, 255, 0.5);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 6px 6px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.div`
  padding: 10px 14px;
  font-size: 14px;
  cursor: pointer;
  color: #333;
  background-color: white;

  &:hover {
    background-color: #3399ff;
    color: white;
  }
`;

const NoOptions = styled.div`
  padding: 10px 14px;
  font-size: 14px;
  color: #999;
  background-color: #f9f9f9;
  font-style: italic;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-top: 1px solid #ccc;
  border-radius: 0 0 6px 6px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
