import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CustomModalTitle,
  StyledModal,
} from "../../../../Styles/ModalStyles/AddModalStyles";
import ModalCloseButton from "../../../../Components/Buttons/ModalCloseButton";
import {
  DownArrowIcon,
  ErrorText,
  FormContainer,
  Input,
  InputGroup,
  Label,
  StyledSelect,
  StyledSelectWrapper,
} from "../../../../Styles/Form Styles/FormStyles";
import IconButton from "../../../../Components/Buttons/Icon Button/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { GetSession } from "../../../../Lib/Session";
import {
  AddGst,
  ClearAddGst,
  ClearEditGst,
  EditGst,
} from "../../../../Redux/Api/Settings/action";
interface FormData {
  GstType: string;
  Percentage: string;
}

interface AddCdModalProps {
  Show: boolean;
  handleCloseModal: () => void;
  EditData: FormData | null;
  setEditData: Dispatch<SetStateAction<FormData | null>>;
}
const AddGSTModal: React.FC<AddCdModalProps> = ({
  Show,
  handleCloseModal,
  EditData,
  setEditData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>();

  const dispatch = useDispatch();
  const SessionData = GetSession();

  const AddGstResponse: any = useSelector(
    (state: any) => state.SettingReducers.AddGstRes
  );
  const EditGstResponse: any = useSelector(
    (state: any) => state.SettingReducers.EditGstRes
  );
  const CloseModal = () => {
    reset();
    handleCloseModal();
    setEditData(null);
  };
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const Payload = {
      gstType: data.GstType,
      percentage: data.Percentage,
      organizationId: SessionData?.user?.organizationId,
      branchId: SessionData?.user?.branchId,
      addedByUser: SessionData?.user?.addedByUser,
    };

    if (EditData) {
      const editPayload = {
        ...Payload,
        editedByUser: SessionData?.user?.editByUser,
        id: EditData?.gstId,
      };

      dispatch(EditGst(editPayload) as any);
    } else {
      dispatch(AddGst(Payload) as any);
    }

    CloseModal();
  };
  useEffect(() => {
    if (EditData) {
      setValue("GstType", EditData?.gstType, { shouldValidate: false });
      setValue("Percentage", EditData?.percentage, { shouldValidate: false });
    }
  }, [EditData]);
  useEffect(() => {
    console.log("EditData", EditData);
  }, [EditData]);

  useEffect(() => {
    if (
      AddGstResponse?.status == "Success" ||
      EditGstResponse?.status == "Success"
    ) {
      dispatch(ClearAddGst());
      dispatch(ClearEditGst());
      setEditData(null);
      CloseModal();
    }
  }, [AddGstResponse, EditGstResponse]);
  return (
    <StyledModal show={Show} onHide={CloseModal} centered>
      <Modal.Header className="d-flex justify-content-between align-items-start p-4">
        <div className="d-flex flex-column gap-2">
          <CustomModalTitle>
            {EditData ? "Edit" : "Add"} New Gst{" "}
          </CustomModalTitle>
        </div>

        <ModalCloseButton onClick={CloseModal} />
      </Modal.Header>
      <Modal.Body className="p-4">
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm={6} md={6}>
              <InputGroup>
                <Label>Gst Type </Label>
                <Input
                  {...register("GstType", {
                    required: "Gst Type is required",
                  })}
                  type="text"
                />
                {errors.GstType && (
                  <ErrorText>{errors.GstType.message}</ErrorText>
                )}
              </InputGroup>
            </Col>
            <Col sm={6} md={6}>
              <InputGroup>
                <Label>Percentage</Label>
                <Input
                  {...register("Percentage", {
                    required: "Percentage is required",
                  })}
                  type="number"
                />
                {errors.Percentage && (
                  <ErrorText>{errors.Percentage.message}</ErrorText>
                )}
              </InputGroup>
            </Col>
          </Row>

          <div className="d-flex mt-4 gap-4">
            <IconButton
              border="1px solid #DB1B24"
              color="#DB1B24"
              width="100%"
              bg="#FFFFFF"
              height="40px"
              onClick={CloseModal}
            >
              Cancel
            </IconButton>
            <IconButton
              border="1px solid #AEAEAE"
              color="#FFFFFF"
              width="100%"
              bg="#0539F4"
              height="40px"
                type="button"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </IconButton>
          </div>
        </FormContainer>
      </Modal.Body>
    </StyledModal>
  );
};

export default AddGSTModal;
