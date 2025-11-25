import React from "react";
import { Image, Modal } from "react-bootstrap";
import styled from "styled-components";
import DeleteIcon from "../../Assets/DeleteFile.png";
import IconButton from "../Buttons/Icon Button/IconButton";

// Define the interface for component props
interface ConfirmationModalProps {
  show: boolean;
  handleClose: () => void;
  onConfirmDelete: () => void;
}

// Create a styled container for positioning the close button
const StyledModalBody = styled(Modal.Body)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 25px;
  width: 100%;
`;
const MainHeading = styled.div`
  font-size: 24px;
  font-weight: 600;
  line-height: 35px;
  margin-bottom:10px;
`;
const SubHeading = styled.div`
  color:#5B5B5B;
`;

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  handleClose,
  onConfirmDelete,
}) => {
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event propagation to parent components
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      onClick={handleModalClick}
      className="p-4"
    >
      <StyledModalBody>
        <Image src={DeleteIcon} alt="Delete icon" className="mb-3" />
        <MainHeading>Are you sure you want to
          <br/>
           delete this file?</MainHeading>
        {/* <SubHeading>Filename5288gdk.pdf</SubHeading> */}
        <ButtonContainer>
          <IconButton
            width="174px"
            border=" 1px solid #BABABA"
            onClick={handleClose}
          >
            Cancel
          </IconButton>
          <IconButton width="174px" bg="#FF5A54" onClick={onConfirmDelete}>
            Delete
          </IconButton>
        </ButtonContainer>
      </StyledModalBody>
    </Modal>
  );
};

export default ConfirmationModal;
