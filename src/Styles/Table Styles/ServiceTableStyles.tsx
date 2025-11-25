// ServiceTableStyles.js
import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
  z-index: -999;
  .custom-checkbox {
    width: 15px;
    height: 15px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
  height: 200px;
  th,
  td {
    padding: 15px 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;
export const Thead = styled.thead`
  background: #f8f9fa;
`;

export const TBody = styled.tbody`
  background: #fff;
`;
export const Th = styled.th`
  font-weight: 600;
  color: #555;
`;

export const Td = styled.td`
  vertical-align: middle;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const AddItemButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

export const DeleteIcon = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: darkred;
  }
`;
