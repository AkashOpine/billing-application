import styled from "styled-components";
import { IoChevronDown } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { Col } from "react-bootstrap";
import { IoIosClose } from "react-icons/io";
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid #e1e1e1;
  padding: 5px;
  padding-left: 15px;
  font-size: 14px;
  border-radius: 5px;
  height: 38px;
  color: #000000;

  &:focus {
    outline: none;
  }

  /* Hide number input spinner for Chrome, Safari, Edge */
  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Hide number input spinner for Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;


export const Label = styled.label`
  margin-bottom: 12px;
  color: #000000;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;
export const MainLabel = styled.label`
  color: ${(props) => props.color || "#878787"};
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
  line-height: 21.09px;
  display: flex;
  align-items: center;
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 302px;
  height: 41px;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RadioInput = styled.input`
  accent-color: #0539f4;
  width: 16px;
  height: 16px;
  background-color: #0539f4;

  &:checked::before {
  }
`;

export const ProfileImage = styled.div`
  width: 206px;
  height: 143px;
  border-radius: 5px;
  background-color: #b832ce05;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .close-button {
    position: absolute;
    cursor: pointer;
    background-color: rgb(255, 255, 255);
    border: none;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 5px 0px;
    color: #652ae2;
    font-size: 16px;
    font-weight: 800;
    height: 20px;
    margin: 0px;
    opacity: 1;
    outline: 0px;
    padding: 0px;
    right: -10px;
    top: -10px;
    width: 20px;
    justify-content: center;
    align-items: center;
    display: flex;
  }
`;

export const UploadButton = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 136px;
  height: 140px;
  border: 0.5px dashed #b832ce;
  border-radius: 5px;
  background: #b832ce05;
  color: #b832ce;
  cursor: pointer;
  text-align: center;

  input {
    display: none;
  }

  img {
    margin-bottom: 16px;
  }
`;

export const StyledSelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledSelect = styled.select`
  font-size: 14px;
  border: 0.5px solid #d6d6d6;
  width: 100%;
  padding: 5px;
  padding-left: 15px;
  border-radius: 5px;
  height: 41px;
  color: #000000;
  padding-right: 40px; /* to make space for the icon */
  appearance: none; /* Remove default arrow */
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const DownArrowIcon = styled(IoChevronDown)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #b9b9b9;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;
export const SearchInput = styled.input`
  border: 0.5px solid #d6d6d6;
  padding: 5px;
  border-radius: 5px;
  height: 41px;
  width: 100%;
  color: #000000;
  padding-right: 40px; /* to make space for the icon */
  &:focus {
    outline: none;
  }
`;

export const SearchIcon = styled(FiSearch)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #b9b9b9;
  pointer-events: none;
`;
export const TextArea = styled.textarea`
  border: 0.5px solid #d6d6d6;
  padding: 5px;
  border-radius: 5px;
  height: 80px; /* Adjust height as needed */
  width: 100%;
  color: #000000;
  &:focus {
    outline: none;
  }
`;

export const BorderContainer = styled.div`
  border: 0.5px solid #d6d6d6;
  flex: 1;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;
export const ErrorText = styled.span`
  color: #db1b24;
  font-size: 14px;
  margin-top: 5px;
`;
export const DeleteIcon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const YesButton = styled.button<{ isSelected?: boolean }>`
  height: 33px;
  width: 74px;
  background-color: ${(props) => (props.isSelected ? "#0539F4" : "#0539F417")};
  /* box-shadow: 0px 4px 12px 0px #00000021; */
  border: none;
  color: ${(props) => (props.isSelected ? "#fff" : "#000")};
  border-radius: 47px;
  cursor: pointer;
`;
export const NoteLabel = styled.div`
  color: #7e7e7e;
  font-style: italic;
  font-weight: 300;
`;

//Date select with date type

export const DateCountContainer = styled.div`
  border: 0.5px solid #d6d6d6;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DateCountInput = styled(Input)`
  border: none;
  flex: 1;
  width: 50%;
  /* Hide the arrows in number input */
  -moz-appearance: "textfield"; /* Firefox */

  /* Remove the arrow buttons in Chrome, Safari, and Edge */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const DateTypeSelect = styled(StyledSelect)`
  border: none;
`;

export const InputWithSymbolGroup = styled.div`
  display: flex;
  align-items: center;
  border: 0.5px solid #d6d6d6;
  border-radius: 5px;
  overflow: hidden;
`;

export const NumberInputWithSymbol = styled(Input)`
  border: none;
  border-radius: 0;
  flex: 1;
  &:focus {
    outline: none;
  }
  /* Hide the arrows in number input */
  -moz-appearance: "textfield"; /* Firefox */

  /* Remove the arrow buttons in Chrome, Safari, and Edge */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const InputSymbol = styled.div`
  height: 41px;
  background-color: #e5e5e5;
  font-size: 16px;
  color: #5b5b5b;
  padding: 0 10px;
  color: #8d8d8d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Skipdiv = styled.div`
  color: #f69400;
  font-weight: 500;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
`;
export const FormContainerCol = styled(Col)`
  border-right: 1px solid #d6d6d6;
`;
export const TopicList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;
export const TopicItem = styled.div`
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  background-color: #f8f9fa;
  border: 0.5px solid #d3d3d3;
  border-radius: 4px;
  position: relative;
`;

export const TopicCloseIcon = styled(IoIosClose)`
  margin-left: 10px;
  cursor: pointer;
  color: #dc3545;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  &.visible {
    opacity: 1;
  }
`;
