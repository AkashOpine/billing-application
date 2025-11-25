import React from "react";
import { Offcanvas } from "react-bootstrap";
import styled from "styled-components";
import IconButton from "../../../Components/Buttons/Icon Button/IconButton";

interface DownloadPdfModalProps {
  show: boolean;
  handleClose: () => void;
  PdfData: any;
}

const InvoicePDFModal: React.FC<DownloadPdfModalProps> = ({
  show,
  handleClose,
  PdfData,
}) => {
  return (
    <Offcanvas style={{width:"96vh"}} show={show} onHide={handleClose} placement="end">
      <StyledOffCanvasBody>
        <iframe
          src={PdfData || ""}
          style={{ height: "100%", width: "100%", border: "none" }}
          title="PDF Viewer"
        ></iframe>
        <IconButton
          border="1px solid #DB1B24"
          color="#DB1B24"
          width="100%"
          bg="#FFFFFF"
          height="40px"
          onClick={handleClose}
        >
          Cancel
        </IconButton>
      </StyledOffCanvasBody>
    </Offcanvas>
  );
};

const StyledOffCanvasBody = styled(Offcanvas.Body)`
  width: 47vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export default InvoicePDFModal;
