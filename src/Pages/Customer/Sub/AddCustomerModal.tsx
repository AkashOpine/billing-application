import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  CustomModalTitle,
  Label,
  StyledModal,
} from "../../../Styles/ModalStyles/AddModalStyles";
import ModalCloseButton from "../../../Components/Buttons/ModalCloseButton";
import {
  DownArrowIcon,
  ErrorText,
  FormContainer,
  Input,
  InputGroup,
  StyledSelect,
  StyledSelectWrapper,
} from "../../../Styles/Form Styles/FormStyles";
import IconButton from "../../../Components/Buttons/Icon Button/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { GetSession } from "../../../Lib/Session";
import {
  AddCustomer,
  ClearAddCustomer,
  ClearEditCustomer,
  EditCustomer,
  GetCustomerList,
} from "../../../Redux/Api/Customer/action";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  phone: string;
  email: string;
  gstNo: string;
  customerName: string;
  customerId: string;
  gstNumber: string;
  address: string;
}

interface AddCdModalProps {
  Show: boolean;
  handleCloseModal: () => void;
  EditData?: FormData | null;
  setEditData?: Dispatch<SetStateAction<FormData | null>>;
  setAddedCustNo?: (value: string) => void;
  setAddedCustName?: (value: string) => void;
}
const AddCustomerModal: React.FC<AddCdModalProps> = ({
  Show,
  handleCloseModal,
  EditData,
  setEditData,
  setAddedCustNo,
  setAddedCustName,
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

  const AddCustomerResponse: any = useSelector(
    (state: any) => state.CustomerReducers.AddCustomerRes
  );
  const EditCustomerResponse: any = useSelector(
    (state: any) => state.CustomerReducers.EditCustomerRes
  );
  const CustomerResponse: any = useSelector(
    (state: any) => state.CustomerReducers.GetCustomerList
  );
  const PhoneNumber = watch("phone");
  const CustName = watch("name");

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
      customerName: data.name,
      phone: data.phone,
      email: data.email,
      gstNumber: data.gstNo,
      address: data.address,
      organizationId: SessionData?.user?.organizationId,
      branchId: SessionData?.user?.branchId,
      addedByUser: SessionData?.user?.addedByUser,
    };

    if (EditData) {
      const editPayload = {
        ...Payload,
        editedByUser: SessionData?.user?.editByUser,
        id: EditData?.customerId,
      };

      dispatch(EditCustomer(editPayload) as any);
    } else {
      dispatch(AddCustomer(Payload) as any);
    }

    CloseModal();
  };
  useEffect(() => {
    if (PhoneNumber) {
      dispatch(GetCustomerList(null) as any);
    }
  }, [PhoneNumber]);

  useEffect(() => {
    if (CustomerResponse?.length > 0 && PhoneNumber && !EditData) {
      const isExisting = CustomerResponse.some(
        (cust: any) => cust.phone === PhoneNumber
      );

      if (isExisting) {
        toast.error("Customer with this phone number already exists");
        setValue("phone", ""); // Clear the phone number
      }
    }
  }, [CustomerResponse, PhoneNumber, EditData]);

  useEffect(() => {
    if (EditData) {
      setValue("name", EditData?.customerName, { shouldValidate: false });
      setValue("phone", EditData?.phone, { shouldValidate: false });
      setValue("email", EditData?.email, { shouldValidate: false });
      setValue("gstNo", EditData?.gstNumber, { shouldValidate: false });
      setValue("address", EditData?.address, { shouldValidate: false });
    }
  }, [EditData]);
  useEffect(() => {
    if (PhoneNumber && typeof setAddedCustNo === "function") {
      setAddedCustNo(PhoneNumber);
    }
  }, [PhoneNumber]);
  
  useEffect(() => {
    if (CustName && typeof setAddedCustName === "function") {
      setAddedCustName(CustName);
    }
  }, [CustName]);

  useEffect(() => {
    if (
      AddCustomerResponse?.status == "Success" ||
      EditCustomerResponse?.status == "Success"
    ) {
      dispatch(ClearAddCustomer());
      dispatch(ClearEditCustomer());
      setEditData?.(null);
      CloseModal();
    }
  }, [AddCustomerResponse, EditCustomerResponse]);

  return (
    <StyledModal show={Show} onHide={CloseModal} centered>
      <Modal.Header className="d-flex justify-content-between align-items-start p-4">
        <div className="d-flex flex-column gap-2">
          <CustomModalTitle>
            {EditData ? "Edit" : "Add"} New Customer
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
                  {...register(
                    "phone"
                    //    {
                    //   validate: (value) => {
                    //     if (value === "" || value === null) return true; // not required
                    //     return (
                    //       value.length === 10 ||
                    //       "Phone number must be exactly 10 digits"
                    //     );
                    //   },
                    // }
                  )}
                  // onInput={(e) => {
                  //   const target = e.target as HTMLInputElement;
                  //   if (target.value.length > 10) {
                  //     target.value = target.value.slice(0, 10);
                  //   }
                  // }}
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
          <Row>
            <Col sm={6} md={6}>
              <InputGroup>
                <Label>Address</Label>
                <Input id="address" type="text" {...register("address")} />
                {errors.address && (
                  <ErrorText>{errors.address.message}</ErrorText>
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

export default AddCustomerModal;
