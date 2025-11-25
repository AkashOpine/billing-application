import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { HiOutlineDotsVertical } from "react-icons/hi";
import styled from "styled-components";
import ConfirmIcon from "../../../Assets/Actions/Confirm.png";
import DeleteIcon from "../../../Assets/Actions/Delete.png";
import EditIcon from "../../../Assets/Actions/Edit.png";
import TerminateIcon from "../../../Assets/Actions/Terminate.png";
import ResignIcon from "../../../Assets/Actions/Resign.png";
import EmailIcon from "../../../Assets/Actions/Mail.png";
import IncrementIcon from "../../../Assets/Actions/increment.png";
import { FaRegFilePdf } from "react-icons/fa6";

interface ActionDropdownProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onConfirm?: () => void;
  onTerminate?: () => void;
  onResign?: () => void;
  onMail?: () => void;
  onReject?: () => void;
  onPromotion?: () => void;
  onPrint?: () => void;
  onPdfDownload?: () => void;
  isDispose?: boolean;
}

export const StyledDropdown = styled(Dropdown)`
  display: inline-block;
`;
export const SyledMenu = styled(Dropdown.Menu)`
  box-shadow: 1px 2px 79px 0px #00000026;
`;

export const ActionIcon = styled(HiOutlineDotsVertical)`
  cursor: pointer;
  color: #28303f;
`;

export const StyledDropdownItem = styled(Dropdown.Item)`
  display: flex;
  gap: 20px;
  align-items: center;
  &:hover,
  &:focus,
  &.active {
    color: #000000;
    background-color: #fef5ff;
    text-decoration: none;
  }
  img {
    width: 16px;
    height: 16px;
  }
`;

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  onEdit,
  onDelete,
  onConfirm,
  onTerminate,
  onResign,
  onMail,
  onReject,
  onPromotion,
  onPrint,
  onPdfDownload,
  isDispose = false, // default false to show "Delete"
}) => {
  return (
    <>
      <StyledDropdown onClick={(e) => e.stopPropagation()}>
        <Dropdown.Toggle variant="link" bsPrefix="p-0">
          <ActionIcon />
        </Dropdown.Toggle>
        <SyledMenu>
          {onEdit && (
          <StyledDropdownItem onClick={onEdit}>
            <img src={EditIcon} alt="edit" />
            Edit
          </StyledDropdownItem>
          )}
          {onDelete && (
            <StyledDropdownItem onClick={onDelete}>
              <img src={DeleteIcon} alt={isDispose ? "dispose" : "delete"} />
              {isDispose ? "Dispose" : "Delete"}
            </StyledDropdownItem>
          )}
          {onPdfDownload && (
            <StyledDropdownItem onClick={onPdfDownload}>
              <FaRegFilePdf />
              View PDF
            </StyledDropdownItem>
          )}
          {onConfirm && (
            <StyledDropdownItem onClick={onConfirm}>
              <img src={ConfirmIcon} alt="confirm" />
              Confirm
            </StyledDropdownItem>
          )}
          {onTerminate && (
            <StyledDropdownItem onClick={onTerminate}>
              <img src={TerminateIcon} alt="terminate" />
              Terminate
            </StyledDropdownItem>
          )}
          {onResign && (
            <StyledDropdownItem onClick={onResign}>
              <img src={ResignIcon} alt="resign" />
              Resign
            </StyledDropdownItem>
          )}
          {onMail && (
            <StyledDropdownItem onClick={onMail}>
              <img src={EmailIcon} alt="Email" />
              Send mail
            </StyledDropdownItem>
          )}
          {onReject && (
            <StyledDropdownItem onClick={onReject}>
              <img src={TerminateIcon} alt="reject" />
              Reject
            </StyledDropdownItem>
          )}
          {onPromotion && (
            <StyledDropdownItem onClick={onPromotion}>
              <img src={IncrementIcon} alt="Promotion" />
              Promotion
            </StyledDropdownItem>
          )}
          {onPrint && (
            <StyledDropdownItem onClick={onPrint}>Print All</StyledDropdownItem>
          )}
        </SyledMenu>
      </StyledDropdown>
    </>
  );
};
export default ActionDropdown;
