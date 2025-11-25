import styled from "styled-components";

export const TabContainer = styled.div`
  margin-top: 20px;
`;

export const TabHeader = styled.div`
  border: 0.5px solid #b0b0b0;
  width:max-content;
  border-radius:5px;
`;

export const TabButton = styled.button<{ active: boolean }>`
  background: ${(props) => (props.active ? "#005eff" : "none")};
  color: ${(props) => (props.active ? "white" : "#444")};
  border-right: 0.5px solid #b0b0b0;
  border-left: none;
  border-top: none;
  border-bottom: none;

  padding: 10px 19px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  &:hover {
    background: #005eff;
    color: white;
  }
`;

export const TabContent = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  padding: 20px 0;
`;
