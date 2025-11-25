import styled from "styled-components";

export const OrderDetailsContainer = styled.div`
  box-shadow: 2px 9px 42px 0px #00000014;
  background: #fff;
  border: none;
  border-radius: 10px;
  padding: 20px 15px;
`;
export const SectionTitle = styled.h5`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 14px;
  color: #7c7c7c;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;

  input {
    flex: 1;
    padding: 0.5rem;
    padding-left: 1rem;
    border-radius: 6px;
    border: 1px solid #e1e1e1;
    outline: none;
  }
  .search-icon {
    position: absolute;
    right: 60px;
  }
  button {
    background-color: #007bff;
    border: none;
    padding: 0.2rem;
    color: white;
    margin-left: 0.5rem;
    border-radius: 6px;
  }
`;

export const ItemList = styled.div`
  border-top: 1px solid #ccc;
`;

export const ItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 6px;
    margin-right: 1rem;
  }
`;

export const QuantityControls = styled.button`
  background-color: #0539f438;
  color: #0539f4;
  border: none;
  border-radius: 50%;
  padding: 5px 8px;
`;

export const PriceBox = styled.div`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

export const Summary = styled.div`
  display: flex;
   background-color: #eef1ff;
  flex-direction: column;
  
`;
export const HighlightRow = styled.div`
  background-color: #eef3ff;
  font-weight: 600;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 12px 0;
`;
export const SummaryDetailsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
  align-items: center;
`;
export const BalanceDue = styled.div`
  text-align: right;
  font-weight: bold;
  color: purple;
  margin-top: 1rem;
`;
