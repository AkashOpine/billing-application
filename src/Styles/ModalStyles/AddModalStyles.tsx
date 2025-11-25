import styled from "styled-components";
import { Modal } from "react-bootstrap";

  export const StyledModal = styled(Modal)`
    font-family: "Roboto";
    border-radius:10px;
    .modal-dialog {
      
      --bs-modal-width:650px;
    }
  `;
export const InvoiceModal = styled(Modal)`
  font-family: "Roboto";
  .modal-dialog {
    margin: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 50%; /* Set width to half of the viewport width */
    min-height: 100vh; /* Full viewport height */
  }
  .modal-content {
    border-radius: 0;
    background: #ffffff !important;
    height: 100vh;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export const CustomModalTitle = styled(Modal.Title)`
font-size: 22px;
font-weight: 500;
line-height: 25.78px;
/* text-align: left; */
`;
export const CustomModalSubTitle = styled.div`
color: #8D8D8D;

`;
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  color: #8d8d8d;
`;
export const StyledSelect = styled.select`
  border: 0.5px solid #d6d6d6;
  width:100%;
  padding: 5px;
  border-radius: 5px;
  height: 36px;
  color: #000000;
  padding-right: 40px; /* to make space for the icon */
  appearance: none; /* Remove default arrow */
  cursor:pointer;
  &:focus {
    outline: none;
  }
`;

export const Input = styled.input`
  border: 0.5px solid #d6d6d6;
  padding: 5px;
  border-radius: 5px;
  height: 36px;
  color: #000000;
  &:focus {
    outline: none;
  }
`;
export const DateCountContainer = styled.div`
 border: 0.5px solid #d6d6d6;
 border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content:space-between;
`;

export const DateCountInput = styled(Input)`
  border: none;
  flex: 1;
  /* Hide the arrows in number input */
  -moz-appearance: textfield; /* Firefox */
  
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


export const UploadButton = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  border: 0.5px dashed #b832ce;
  border-radius: 7px;
  background: #b832ce05;
  color: #b832ce;
  cursor: pointer;
  text-align: center;

  input {
    display: none;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;
