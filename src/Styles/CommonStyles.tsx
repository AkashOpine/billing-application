import { Container } from "react-bootstrap";
import styled from "styled-components";
interface IconContainerButtonProps {
  color?: string;
  backgroundColor?: string;
}
export const MainHeading = styled.div`
  font-size: 21px;
  font-weight: 500;
  line-height: 24.68px;
`;
export const IconContainerButton = styled.button<IconContainerButtonProps>`
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  color: ${(props) => props.color || "inherit"};
  background-color: ${(props) => props.backgroundColor || "transparent"};
`;
export const MainContainer = styled.div`
padding:20px;
background:#FFFFFF80;
border:none;
border-radius:10px;
width:100%;

`