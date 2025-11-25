import React, { Dispatch, SetStateAction, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { GetSession } from "../../../Lib/Session";
import {
  AddVendor,
  ClearAddVendor,
  ClearEditVendor,
  EditVendor,
  GetVendorList,
} from "../../../Redux/Api/Vendor/action";
import toast from "react-hot-toast";
import {
  CustomModalTitle,
  Label,
  StyledModal,
} from "../../../Styles/ModalStyles/AddModalStyles";
import { Col, InputGroup, Modal, Row } from "react-bootstrap";
import ModalCloseButton from "../../../Components/Buttons/ModalCloseButton";
import {
  ErrorText,
  FormContainer,
  Input,
} from "../../../Styles/Form Styles/FormStyles";
import IconButton from "../../../Components/Buttons/Icon Button/IconButton";

interface FormData {
  name: string;
  phone: string;
  email: string;
  gstNo: string;
  vendorName: string;
  vendorId: string;
  gstNumber: string;
}

interface AddVendorModalProps {
  Show: boolean;
  handleCloseModal: () => void;
  EditData?: FormData | null;
  setEditData?: Dispatch<SetStateAction<FormData | null>>;
  setAddedVendorNo?: (value: string) => void;
}
const AddVendorModal: React.FC<AddVendorModalProps> = ({
  Show,
  handleCloseModal,
  EditData,
  setEditData,
  setAddedVendorNo,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({ mode: "onChange" });

  const dispatch = useDispatch();
  const SessionData = GetSession();
  const gstNo = watch("gstNo") || "";

  const AddVendorResponse: any = useSelector(
    (state: any) => state.VendorReducers.AddVendorRes
  );
  const EditVendorResponse: any = useSelector(
    (state: any) => state.VendorReducers.EditVendorRes
  );
  const VendorResponse: any = useSelector(
    (state: any) => state.VendorReducers.GetVendorList
  );
  const PhoneNumber = watch("phone");

  const CloseModal = () => {
    reset();
    handleCloseModal();
    setEditData?.(null);
  };
  const validateGst = (value: string) => {
    if (!value) return true; // allow empty input

    if (!/^[0-9]{2}/.test(value))
      return "The first two characters must be numbers";

    if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]/.test(value))
      return "Characters 3-12 must follow valid PAN format (e.g., ABCDE1234F)";

    if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9]/.test(value))
      return "13th character must be a digit (1–9) or alphabet";

    if (value[13] !== "Z") return "14th character must be 'Z'";

    if (!/[A-Z0-9]$/.test(value[14]))
      return "15th character must be an alphabet or number";

    if (value.length !== 15)
      return "GST number must be exactly 15 characters long";

    return true;
  };

  const handleInput = (e: any) => {
    const input = e.target.value.toUpperCase().slice(0, 15); // max 15 characters & uppercase
    setValue("gstNo", input);
  };
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const Payload = {
      vendorName: data.name,
      phone: data.phone,
      email: data.email,
      gstNumber: data.gstNo,
      organizationId: SessionData?.user?.organizationId,
      branchId: SessionData?.user?.branchId,
      addedByUser: SessionData?.user?.addedByUser,
    };

    if (EditData) {
      const editPayload = {
        ...Payload,
        editedByUser: SessionData?.user?.editByUser,
        id: EditData?.vendorId,
      };

      dispatch(EditVendor(editPayload) as any);
    } else {
      dispatch(AddVendor(Payload) as any);
    }

    CloseModal();
  };

  useEffect(() => {
    if (PhoneNumber) {
      dispatch(GetVendorList(null) as any);
    }
  }, [PhoneNumber]);

  useEffect(() => {
    if (VendorResponse?.length > 0 && PhoneNumber && !EditData) {
      const isExisting = VendorResponse.some(
        (cust: any) => cust.phone === PhoneNumber
      );

      if (isExisting) {
        toast.error("Customer with this phone number already exists");
        setValue("phone", ""); // Clear the phone number
      }
    }
  }, [VendorResponse, PhoneNumber, EditData]);

  useEffect(() => {
    if (EditData) {
      setValue("name", EditData?.vendorName, { shouldValidate: false });
      setValue("phone", EditData?.phone, { shouldValidate: false });
      setValue("email", EditData?.email, { shouldValidate: false });
      setValue("gstNo", EditData?.gstNumber, { shouldValidate: false });
    }
  }, [EditData]);
  useEffect(() => {
    if (PhoneNumber && typeof setAddedVendorNo === "function") {
      setAddedVendorNo(PhoneNumber);
    }
  }, [PhoneNumber]);

  useEffect(() => {
    if (
      AddVendorResponse?.status == "Success" ||
      EditVendorResponse?.status == "Success"
    ) {
      dispatch(ClearAddVendor());
      dispatch(ClearEditVendor());
      setEditData?.(null);
      CloseModal();
    }
  }, [AddVendorResponse, EditVendorResponse]);

  return (
    <StyledModal show={Show} onHide={CloseModal} centered>
      <Modal.Header className="d-flex justify-content-between align-items-start p-4">
        <div className="d-flex flex-column gap-2">
          <CustomModalTitle>
            {EditData ? "Edit" : "Add"} New Vendor
          </CustomModalTitle>
        </div>

        <ModalCloseButton onClick={CloseModal} />
      </Modal.Header>
      <Modal.Body className="p-4">
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm={6} md={6}>
              <InputGroup>
                <Label>Name</Label>
                <Input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  type="text"
                />
                {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
              </InputGroup>
            </Col>
            <Col sm={6} md={6}>
              <InputGroup>
                <Label>Phone</Label>
                <Input
                  type="text"
                  {...register("phone", {
                    required: "Phone No is required",
                    validate: (value) =>
                      value.length === 10 ||
                      "Phone number must be exactly 10 digits",
                  })}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (target.value.length > 10) {
                      target.value = target.value.slice(0, 10);
                    }
                  }}
                />
                {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col sm={6} md={6}>
              <InputGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  {...register("email", {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
              </InputGroup>
            </Col>
            <Col sm={6} md={6}>
              <InputGroup>
                <Label>Gst Number</Label>
                <Input
                  id="gstNo"
                  type="text"
                  value={gstNo}
                  onInput={handleInput}
                  {...register("gstNo", {
                    validate: validateGst,
                  })}
                />
                {errors.gstNo && <ErrorText>{errors.gstNo.message}</ErrorText>}
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
export default AddVendorModal;
