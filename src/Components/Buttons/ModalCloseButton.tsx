import React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

interface ModalCloseButtonProps {
  onClick: () => void;
}

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({ onClick }) => {
  return (
    <StyledModalCloseButton onClick={onClick}>
      <MdClose size={24} />
    </StyledModalCloseButton>
  );
};

const StyledModalCloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  width:24px;
  height:24px;
  svg {
    color: #000; // Change the color as needed
    &:hover {
      color: #000000; // Change hover color as needed
    }
  }
`;

export default ModalCloseButton;
