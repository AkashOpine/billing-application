import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import ImageUploader from "../../../../Components/Uploaders/ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import {
  AddServiceField,
  ClearAddServiceField,
  ClearEditServiceField,
  EditServiceField,
  GetServiceFieldLists,
} from "../../../../Redux/Api/Settings/action";
import { GetSession } from "../../../../Lib/Session";
import toast from "react-hot-toast";

interface FormData {
  ServiceName: string;
  Sac: string;
  Cost: string;

  serviceId: string;
  cost: string;
  sac: string;
  serviceName: string;
  imagePath: string;
}
interface ImageType {
  src: File | string;
  itemImageId?: string | number;
  imageUrl?: string;
}
interface AddCdModalProps {
  Show: boolean;
  handleCloseModal: () => void;
  EditData?: FormData | null;
  setEditData?: Dispatch<SetStateAction<FormData | null>>;
}

const AddServiceFieldModal: React.FC<AddCdModalProps> = ({
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
    watch,
  } = useForm<FormData>();
  const dispatch = useDispatch();
  const SessionData = GetSession();

  const [images, setImages] = useState<ImageType[]>([]);

  const AddServiceFieldResponse: any = useSelector(
    (state: any) => state.SettingReducers.AddServiceFieldRes
  );
  const EditServiceFieldResponse: any = useSelector(
    (state: any) => state.SettingReducers.EditServiceFieldRes
  );
  const ServiceListResponse: any = useSelector(
    (state: any) => state.SettingReducers.GetServiceFieldListRes
  );

  const SACNo = watch("Sac");
  const ServiceName = watch("ServiceName");

  // Handle new image upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImage: ImageType = { src: file };
      setImages((prev) => [...prev, newImage]);
    }
  };

  // Handle removing an image
  const handleRemove = (index: number, itemImageId?: string | number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    console.log("Removed image at index", index, "with ID", itemImageId);
  };

  // Handle editing an image (replacing it with a new one)
  const handleEdit = (index: number, itemImageId?: string | number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg, image/jpg";
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const updatedImages = [...images];
        updatedImages[index] = { ...updatedImages[index], src: file };
        setImages(updatedImages);
        console.log("Edited image at index", index, "with ID", itemImageId);
      }
    };
    input.click();
  };

  const CloseModal = () => {
    reset();
    handleCloseModal();
    setEditData?.(null);
  };

  useEffect(() => {
    if (SACNo) {
      dispatch(GetServiceFieldLists(null) as any);
    }
  }, [SACNo]);
  // useEffect(() => {
  //   if (ServiceListResponse?.length > 0 && SACNo && !EditData) {
  //     const isExisting = ServiceListResponse.some(
  //       (cust: any) => cust.sac === SACNo
  //     );

  //     if (isExisting) {
  //       toast.error("Service with this SAC number already exists");
  //       setValue("Sac", ""); // Clear the Sac number
  //     }
  //   }
  // }, [ServiceListResponse, SACNo, EditData]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();

    // Only include serviceId if editing
    if (EditData?.serviceId) {
      formData.append("serviceId", EditData.serviceId);
    }

    formData.append("serviceName", data.ServiceName);
    formData.append("sac", data.Sac);
    formData.append("cost", data.Cost || 0);
    formData.append("image", "");
    // images.forEach((img) => {
    //   if (img.src) {
    //     formData.append("image", img.src);
    //   }else {

    //   }
    // });

    formData.append("organizationId", SessionData?.user?.organizationId);
    formData.append("branchId", SessionData?.user?.branchId);
    formData.append("addedByUser", SessionData?.user?.addedByUser);

    // Dispatch correct action
    if (EditData) {
      dispatch(EditServiceField(formData) as any);
    } else {
      dispatch(AddServiceField(formData) as any);
    }

    CloseModal();
  };

  useEffect(() => {
    if (EditData) {
      setValue("ServiceName", EditData?.serviceName, { shouldValidate: false });
      setValue("Sac", EditData?.sac, { shouldValidate: false });
      setValue("Cost", EditData?.cost, { shouldValidate: false });
    }
  }, [EditData]);
  useEffect(() => {
    if (
      AddServiceFieldResponse?.status == true ||
      EditServiceFieldResponse?.status == true
    ) {
      dispatch(ClearAddServiceField());
      dispatch(ClearEditServiceField());
      setEditData?.(null);
      CloseModal();
    }
  }, [AddServiceFieldResponse, EditServiceFieldResponse]);

  return (
    <StyledModal show={Show} onHide={CloseModal} centered>
      <Modal.Header className="d-flex justify-content-between align-items-start p-4">
        <div className="d-flex flex-column gap-2">
          <CustomModalTitle>
            {EditData ? "Edit" : "Add"} New Services
          </CustomModalTitle>
        </div>

        <ModalCloseButton onClick={CloseModal} />
      </Modal.Header>
      <Modal.Body className="p-4">
        {/* <div className="d-flex align-items-start">
          <ImageUploader
            images={images}
            handleFileUpload={handleFileUpload}
            handleRemove={handleRemove}
            handleEdit={handleEdit}
            maxFiles={1}
            initialImageSrc={EditData?.imagePath || ""}
          />
        </div> */}
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm={6} md={6}>
              <InputGroup>
                <Label>Service Name</Label>
                <Input
                  {...register("ServiceName", {
                    required: "Service Name is required",
                  })}
                  type="text"
                />
                {errors.ServiceName && (
                  <ErrorText>{errors.ServiceName.message}</ErrorText>
                )}
              </InputGroup>
            </Col>
            <Col sm={6} md={6}>
              <InputGroup>
                <Label>SAC</Label>
                <Input {...register("Sac")} type="number" />
                {errors.Sac && <ErrorText>{errors.Sac.message}</ErrorText>}
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
              <InputGroup>
                <Label>Cost</Label>
                <Input {...register("Cost")} type="text" />
                {errors.Cost && <ErrorText>{errors.Cost.message}</ErrorText>}
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

export default AddServiceFieldModal;
