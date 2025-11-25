import { Row } from "react-bootstrap";
import styled from "styled-components";

export const StyledContainer = styled.div`
  min-width: 960px;
`;
export const ConmmonContainer = styled.div`
  box-shadow: 0px 0px 0px 5px #0539f41f;
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  min-height: 80px;
`;
export const InvoiceContainerDiv = styled.div`
  border: 1px solid #e1e1e1;
  background: #f2f5ff;
  padding: 5px;
  display: flex;
  justify-content: space-around;
  align-items:center;
  border-radius: 8px;
  min-width: 300px;
  text-align: center;
`;
export const SummaryContainer = styled.div`
  background: #f7f9fd;
  border-radius: 10px;
  margin: auto;
  border: 1px solid #e5e5e5;
  padding: 0px 15px;
  background: #fefefe;
`;
export const StyledRow = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e5e5e5;
`;

export const SummaryDetailsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
  align-items: center;
`;
export const HighlightRow = styled.div`
  border-top: 1px solid #e5e5e5;
  background-color: #eef3ff;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 12px 0px;
`;

export const Label = styled.label`
  font-size: 16px;
  color: #333;
`;

export const Value = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #222;
`;

export const Input = styled.input`
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  width: 150px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  input {
    margin-right: 8px;
    height: 20px;
  }
  input[type="checkbox" i] {
    height: 20px;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 16px;
  color: #333;
`;

export const BalanceDue = styled.div`
  width: 100%;
  text-align: right;
  font-weight: 600;
  font-size: 16px;
  color: #d633ff;

  span {
    margin-left: 10px;
    color: #d633ff;
    font-weight: bold;
  }
`;
export const PaymentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 12px;
  padding: 15px;
  gap: 20px;
  border: 1px solid #e5e5e5;
`;
export const OptionContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const OptionButton = styled.button<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 2px solid ${({ selected }) => (selected ? "#007bff" : "#d1d5db")};
  background-color: ${({ selected }) => (selected ? "#f0f8ff" : "#fff")};
  color: #333;
  padding: 10px 16px;
  border-radius: 999px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  font-size: 14px;
  input[type="radio"] {
    pointer-events: none;
    accent-color: #007bff;
  }

  &:hover {
    border-color: #007bff;
  }
`;

export const OptionImage = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;
export const ExpectedDDateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ToggleLabel = styled.span<{ active?: boolean }>`
  padding: 4px 8px;
  
  border-radius: 4px;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? "800" : "400")};
  color: ${(props) => (props.active ? "#4f46e5" : "#333")};
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 42px;
  height: 22px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #7c3aed; /* purple */
    transition: 0.4s;
    border-radius: 22px;
  }
  span:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  input:checked + span:before {
    transform: translateX(20px);
  }
`;