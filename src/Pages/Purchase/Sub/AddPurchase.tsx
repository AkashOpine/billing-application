import React, { useEffect, useState } from "react";
import { MainContainer } from "../../../Styles/CommonStyles";
import { useNavigate, useParams } from "react-router-dom";
import ItemDetailsTable from "./ItemDetailsTable";
import {
  ExpectedDDateContainer,
  Label,
  OptionButton,
  OptionContainer,
  OptionImage,
  PaymentWrapper,
  StyledRow,
  SummaryContainer,
  SummaryDetailsDiv,
  Value,
} from "../../Bill/Sub/AddBillsStyles";
import {
  DownArrowIcon,
  ErrorText,
  Input,
  InputGroup,
  StyledSelect,
  StyledSelectWrapper,
  TextArea,
} from "../../../Styles/Form Styles/FormStyles";
import { useForm } from "react-hook-form";
import CardImg from "../../../Assets/Icons/card.png";
import CashImg from "../../../Assets/Icons/cash.png";
import PhonePay from "../../../Assets/Icons/phone-pay.png";
import { Col } from "react-bootstrap";
import IconButton from "../../../Components/Buttons/Icon Button/IconButton";
import InputAuto from "../../../Components/Inputs/AutoCompleteInput/InputAuto";
import AddVendorModal from "../../Vendor/Sub/AddVendorModal";
import { useDispatch, useSelector } from "react-redux";
import {
  GetVendorById,
  GetVendorByPhone,
  GetVendorList,
} from "../../../Redux/Api/Vendor/action";
import FileUploader from "../../../Components/Uploaders/FIleUploader";
import InputAutoV2 from "../../../Components/Inputs/AutoCompleteInput/InputAutoV2";
import toast from "react-hot-toast";
import { ClearGetTransactionsByInvoice } from "../../../Redux/Api/Invoice/action";
import {
  AddPurchaseData,
  EditPurchase,
  GetPurchaseById,
} from "../../../Redux/Api/Purchase/action";
import { GetSession } from "../../../Lib/Session";

interface ItemRow {
  itemName: string;
  quantity: number | "";
  rate: any | "";
  amount: any | "";
  manualAmount: boolean;
}
interface FormData {
  date: string;
  invNumber: string;
  gstType: string;
  cgst: string;
  igst: string;
  sgst: string;
  remarks: string;
  expectedDDate: Date;
  discount: string;
  amountPaid: any;
}
type PaymentOption = "PhonePe" | "Card" | "Cash";
type PaymentStatus = "Partial" | "Paid" | "Pending";

function AddPurchase() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      invNumber: "",
      gstType: "",
      cgst: "",
      sgst: "",
      igst: "",
      date: new Date().toISOString().split("T")[0],
      expectedDDate: new Date(),
    },
    mode: "onChange",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const SessionData = GetSession();

  const [itemRows, setItemRows] = useState<ItemRow[]>([
    { itemName: "", quantity: "", rate: "", amount: "", manualAmount: false },
  ]);
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentOption>("PhonePe");
  const [selectedPaymentStatus, setSelectedPaymentStatus] =
    useState<PaymentStatus>("Paid");
  const [selectedOption, setSelectedOption] = useState<{
    phone: string;
    vendorName: string;
  }>({
    phone: "",
    vendorName: "",
  });
  const [addVendorModal, setAddVendorModal] = useState(false);
  const [addedVendorNo, setAddedVendorNo] = useState("");
  const [phoneSuggestion, setPhoneSuggestion] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const SelectedGstType = watch("gstType");

  const GetVendorListRes: any = useSelector(
    (state: any) => state.VendorReducers.GetVendorList
  );
  const AddVendorResponse: any = useSelector(
    (state: any) => state.VendorReducers.AddVendorRes
  );
  const GetVendorByPhoneResponse: any = useSelector(
    (state: any) => state.VendorReducers.GetVendorByPhoneRes
  );
  const GetPurchaseDetails: any = useSelector(
    (state: any) => state.PurchaseReducers.GetPurchaseById
  );

  const vendorOptions =
    GetVendorListRes?.map((data: any) => ({
      label: `${data.phone} - ${data.vendorName}`,
      value: data.phone,
      vendorName: data.vendorName,
    })) || [];
  const options: { label: PaymentOption; icon: string }[] = [
    { label: "PhonePe", icon: PhonePay },
    { label: "Card", icon: CardImg },
    { label: "Cash", icon: CashImg },
  ];
  const paymentStatus: { label: PaymentStatus }[] = [
    { label: "Paid" },
    { label: "Pending" },
    { label: "Partial" },
  ];
  const handleOpenAddVendorModal = () => {
    setAddVendorModal(true);
  };
  const handleCloseAddVendorModal = () => {
    setAddVendorModal(false);
  };

  const updateRow = (index: number, updatedRow: ItemRow) => {
    const updated = [...itemRows];
    updated[index] = updatedRow;
    setItemRows(updated);
  };

  const addRow = () => {
    setItemRows([
      ...itemRows,
      { itemName: "", quantity: "", rate: "", amount: "", manualAmount: false },
    ]);
  };

  const deleteRow = (index: number) => {
    const updated = itemRows.filter((_, i) => i !== index);
    setItemRows(updated);
  };

  const watchedAmountPaid = watch("amountPaid") || 0;
  const watchedDiscount = watch("discount") || 0;
  const watchedCGST = watch("cgst") || 0;
  const watchedSGST = watch("sgst") || 0;
  const watchedIGST = watch("igst") || 0;
  const watchedGstType = watch("gstType");

  const netAmount = itemRows.reduce((acc, curr) => {
    return acc + (typeof curr.amount === "number" ? curr.amount : 0);
  }, 0);

  const gstTotal =
    watchedGstType === "intra-state"
      ? Number(watchedCGST || 0) + Number(watchedSGST || 0)
      : watchedGstType === "inter-state"
      ? Number(watchedIGST || 0)
      : 0;

  const alreadyPaid = id ? Number(GetPurchaseDetails?.poPaidAmount || 0) : 0;
  const grantTotal = netAmount - Number(watchedDiscount || 0) + gstTotal;
  const balanceDue =
    grantTotal - (alreadyPaid + Number(watchedAmountPaid || 0));

  useEffect(() => {
    dispatch(GetVendorList(null) as any);
  }, [AddVendorResponse?.status === "Success"]);
  useEffect(() => {
    if (selectedOption.phone) {
      dispatch(GetVendorByPhone({ data: selectedOption.phone }) as any);
    }
  }, [selectedOption]);

  useEffect(() => {
    if (id) {
      dispatch(
        GetPurchaseById({
          id: id,
        }) as any
      );
    }
  }, [id]);

  useEffect(() => {
    if (addedVendorNo && selectedOption.phone !== addedVendorNo) {
      setPhoneSuggestion(false);
    }
  }, [selectedOption, addedVendorNo]);

  useEffect(() => {
    if (AddVendorResponse?.status === "Success" && addedVendorNo) {
      setSelectedOption({ phone: addedVendorNo, vendorName: "" });
      setPhoneSuggestion(true);
    }
  }, [AddVendorResponse]);

  useEffect(() => {
    if (id && GetPurchaseDetails) {
      const formattedDate = GetPurchaseDetails?.dateCreated
        ? new Date(GetPurchaseDetails.dateCreated).toISOString().split("T")[0]
        : "";

      setValue("date", formattedDate);
      setSelectedOption({
        phone: GetPurchaseDetails?.poVendorPhone || "",
        vendorName: GetPurchaseDetails?.poVendorName,
      });
      setSelectedPaymentStatus(GetPurchaseDetails?.poPaidStatusDescription);
      setSelectedPayment(GetPurchaseDetails?.poPaymentType);
      const url = `https://tomcat.opine.co.in/billing-app-test-0.0.1-SNAPSHOT/api/v1/${GetPurchaseDetails?.poInvoiceFilePath}`;

      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "invoice.pdf", { type: blob.type });
          setSelectedFile(file);
        });

      setValue("invNumber", GetPurchaseDetails?.poInvoiceNumber);
      setValue("date", formattedDate);
      // setValue("amountPaid", GetPurchaseDetails?.poPaidAmount);
      setValue("remarks", GetPurchaseDetails?.poRemarks);
      setValue("igst", GetPurchaseDetails?.poIgst);
      setValue("cgst", GetPurchaseDetails?.poCgst);
      setValue("sgst", GetPurchaseDetails?.poCgst);
      setValue("gstType", GetPurchaseDetails?.poGstType);

      if (GetPurchaseDetails.poItemsList?.length) {
        const itemData = GetPurchaseDetails?.poItemsList?.map((item: any) => ({
          itemName: item.serviceName,
          quantity: item.quantity,
          rate: item.rate,
          amount: item.grossTotal,
          manualAmount: false,
        }));
        setItemRows(itemData);
      }
    }
    console.log("GetPurchaseDetails", GetPurchaseDetails);
  }, [GetPurchaseDetails]);

  const onSubmit = (data: FormData) => {
    if (!selectedOption.phone && !selectedOption.vendorName) {
      toast.error("Please enter the Phone number before submitting the form.");
      return;
    }
    if (
      !itemRows.some((item) => item.itemName && (item.quantity || item.rate))
    ) {
      toast.error(
        "Please add at least one service with required details before submitting the form."
      );
      return;
    }
    const formData = new FormData();

    if (id) {
      formData.append("poId", id);
      formData.append("poVendorId", GetVendorByPhoneResponse?.vendorId);
      formData.append("poVendorName", selectedOption.vendorName);
      formData.append("poVendorPhone", selectedOption.phone);
      formData.append("poVendorEmail", GetVendorByPhoneResponse?.email);
      formData.append("poInvoiceNumber", data.invNumber || 0);
      formData.append("poDateStr", data.date);
      formData.append("poNumber", 0);
      formData.append("poSubTotal", netAmount.toFixed(2));
      formData.append("poGstApplicable", 0);
      formData.append("poGst", 0);
      const paidAmount =
        (Number(data.amountPaid) || 0) +
        (Number(GetPurchaseDetails?.poPaidAmount) || 0);

      formData.append("poPaidAmount", paidAmount.toFixed(2));

      formData.append("poBalanceAmount", balanceDue.toFixed(2) || 0);
      formData.append("poGrandTotal", grantTotal.toFixed(2) || 0);
      formData.append("poPaymentType", selectedPayment);
      formData.append("poRemarks", data.remarks);
      formData.append("poStatus", 0);
      formData.append("poGstType", SelectedGstType);
      formData.append("poIgst", data.igst || 0);
      formData.append("poCgst", data.cgst || 0);
      formData.append("poSgst", data.sgst || 0);
      formData.append("poPaidStatus", 0);
      formData.append("file", selectedFile);
      formData.append("poPaidStatusDescription", selectedPaymentStatus);
      formData.append(
        "organizationId",
        SessionData?.user?.organizationId ?? null
      );
      formData.append("branchId", SessionData?.user?.branchId ?? null);
      formData.append("editedByUser", SessionData?.user?.editByUser);
      const poItemsListStr = itemRows.map((item, index) => ({
        serviceId: 0,
        serviceName: item.itemName,
        quantity: item.quantity,
        rate: parseFloat(item.rate) || 0,
        extraCharge: 0,
        discount: 0,
        grossTotal: parseFloat(item.amount),
      }));
      formData.append("poItemsListStr", JSON.stringify(poItemsListStr));
    } else {
      formData.append("poVendorId", GetVendorByPhoneResponse?.vendorId);
      formData.append("poVendorName", selectedOption.vendorName);
      formData.append("poVendorPhone", selectedOption.phone);
      formData.append("poVendorEmail", GetVendorByPhoneResponse?.email);
      formData.append("poInvoiceNumber", data.invNumber || 0);
      formData.append("poDateStr", data.date);
      formData.append("poNumber", "");
      formData.append("poSubTotal", netAmount.toFixed(2));
      formData.append("poGstApplicable", 0);
      formData.append("poGst", data.igst || 0);
      formData.append("poPaidAmount", data.amountPaid || 0);
      formData.append("poBalanceAmount", balanceDue.toFixed(2) || 0);
      formData.append("poGrandTotal", grantTotal.toFixed(2) || 0);
      formData.append("poPaymentType", selectedPayment);
      formData.append("poRemarks", data.remarks);
      formData.append("poStatus", 0);
      formData.append("poGstType", SelectedGstType);
      formData.append("poIgst", data.igst || 0);
      formData.append("poCgst", data.cgst || 0);
      formData.append("poSgst", data.sgst || 0);
      formData.append("poPaidStatus", 0);
      formData.append("file", selectedFile);
      formData.append("poPaidStatusDescription", selectedPaymentStatus);
      formData.append(
        "organizationId",
        SessionData?.user?.organizationId ?? null
      );
      formData.append("branchId", SessionData?.user?.branchId ?? null);
      formData.append("addedByUser", SessionData?.user?.addedByUser ?? null);
      const poItemsListStr = itemRows.map((item, index) => ({
        serviceId: 0,
        serviceName: item.itemName || 0,
        quantity: item.quantity || 0,
        rate: parseFloat(item.rate) || 0,
        extraCharge: 0,
        discount: 0,
        grossTotal: parseFloat(item.amount) || 0,
        addedByUser: SessionData?.user?.addedByUser ?? null,
      }));

      formData.append("poItemsListStr", JSON.stringify(poItemsListStr));
    }

    if (id) {
      dispatch(EditPurchase(formData) as any);
    } else {
      dispatch(AddPurchaseData(formData) as any);
    }
    navigate(-1);
  };

  useEffect(() => {
    console.log("selectedOption", selectedOption);
  }, [selectedOption]);

  return (
    <MainContainer>
      <h4>{id ? "Edit" : " Add"} New Purchase</h4>
      <div className="mt-4 d-flex justify-content-between">
        <div className="d-flex flex-column gap-3">
          <InputAutoV2
            pholder="Phone Number"
            initialValue={selectedOption.phone}
            data={vendorOptions}
            onSelected={(val: any) => {
              setSelectedOption({
                phone: val.value,
                vendorName: val.vendorName,
              });
            }}
            onChange={(val) => console.log(val)}
            noOptionButtonLabel={"Add New Vendor"}
            onNoOptionClick={handleOpenAddVendorModal}
            hideSuggestions={phoneSuggestion}
          />
          <Input
            type="date"
            {...register("date")}
            style={{ width: "300px", height: "35px" }}
          />

          <Input
            type="text"
            {...register("invNumber")}
            placeholder="Invoice Number"
            style={{ width: "300px", height: "35px" }}
          />
        </div>

        <div className="d-flex align-items-end">
          <FileUploader
            id="invoice-uploader"
            label="Invoice Upload"
            onFileSelect={(f) => setSelectedFile(f)}
            acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
          />
          {/* <iframe
            src={`${GetPurchaseDetails?.poInvoiceFilePath}`}
          ></iframe> */}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="mt-4">
          <h6>Item Details</h6>
          <ItemDetailsTable
            items={itemRows}
            onRowChange={updateRow}
            onAddRow={addRow}
            onDeleteRow={deleteRow}
          />
        </div>

        <div className="mt-4">
          <SummaryContainer>
            <StyledRow>
              <SummaryDetailsDiv>
                <Label>Net Amount</Label>
                <Value>₹ {netAmount.toFixed(2)}</Value>
              </SummaryDetailsDiv>
            </StyledRow>

            <StyledRow>
              <SummaryDetailsDiv>
                <div className="d-flex flex-column">
                  <Label>Pay</Label>
                </div>
                <InputGroup>
                  <Input
                    type="number"
                    {...register("amountPaid", {
                      valueAsNumber: true,
                      validate: (value) =>
                        value <= balanceDue ||
                        "Pay amount cannot be greater than Balance Due",
                    })}
                    style={{ width: "150px", height: "35px" }}
                  />
                  <div>
                    {typeof errors.amountPaid?.message === "string" && (
                      <ErrorText>{errors.amountPaid.message}</ErrorText>
                    )}
                  </div>
                </InputGroup>
              </SummaryDetailsDiv>
            </StyledRow>

            <StyledRow>
              <SummaryDetailsDiv>
                <div className="d-flex flex-column">
                  <Label>Discount</Label>
                </div>
                <Input
                  type="number"
                  {...register("discount")}
                  placeholder="Enter discount"
                  style={{ width: "150px", height: "35px" }}
                />
              </SummaryDetailsDiv>
            </StyledRow>
            <StyledRow>
              <SummaryDetailsDiv>
                <Label>GST Type</Label>
                <StyledSelectWrapper style={{ width: "150px" }}>
                  <StyledSelect
                    {...register("gstType")}
                    style={{ width: "150px", height: "35px" }}
                  >
                    <option value="">Select GST</option>
                    <option value="inter-state"> Inter State</option>
                    <option value="intra-state">Intra State</option>
                  </StyledSelect>
                  <DownArrowIcon />
                </StyledSelectWrapper>
              </SummaryDetailsDiv>
            </StyledRow>

            {SelectedGstType === "intra-state" && (
              <>
                <StyledRow>
                  <SummaryDetailsDiv>
                    <Label>CGST</Label>
                    <Input
                      type="number"
                      {...register("cgst")}
                      style={{ width: "150px", height: "35px" }}
                    />
                  </SummaryDetailsDiv>
                </StyledRow>
                <StyledRow>
                  <SummaryDetailsDiv>
                    <Label>SGST</Label>
                    <Input
                      type="number"
                      {...register("sgst")}
                      style={{ width: "150px", height: "35px" }}
                    />
                  </SummaryDetailsDiv>
                </StyledRow>
              </>
            )}

            {SelectedGstType === "inter-state" && (
              <StyledRow>
                <SummaryDetailsDiv>
                  <Label>IGST</Label>
                  <Input
                    type="number"
                    {...register("igst")}
                    style={{ width: "150px", height: "35px" }}
                  />
                </SummaryDetailsDiv>
              </StyledRow>
            )}

            <StyledRow>
              <SummaryDetailsDiv>
                <Label>Grant Total</Label>
                <Value>₹ {grantTotal.toFixed(2)}</Value>
              </SummaryDetailsDiv>
            </StyledRow>

            {id && (
              <StyledRow>
                <SummaryDetailsDiv>
                  <Label>Amount Paid</Label>
                  <Value>₹ {GetPurchaseDetails?.poPaidAmount.toFixed(2)}</Value>
                </SummaryDetailsDiv>
              </StyledRow>
            )}

            <StyledRow>
              <SummaryDetailsDiv>
                <Label style={{ color: "#d633ff" }}>Balance Due</Label>
                <Value style={{ color: "#d633ff" }}>
                  ₹ {balanceDue.toFixed(2)}
                </Value>
              </SummaryDetailsDiv>
            </StyledRow>
          </SummaryContainer>
        </div>

        <div className="mt-4">
          <PaymentWrapper>
            <Label>Payment Type</Label>
            <OptionContainer>
              {options.map((option) => (
                <OptionButton
                  key={option.label}
                  selected={selectedPayment === option.label}
                  onClick={() => setSelectedPayment(option.label)}
                  type="button"
                >
                  <input
                    type="radio"
                    checked={selectedPayment === option.label}
                    readOnly
                  />
                  <OptionImage src={option.icon} alt={option.label} />
                  {option.label}
                </OptionButton>
              ))}
            </OptionContainer>
          </PaymentWrapper>
        </div>

        <div className="mt-4">
          <PaymentWrapper>
            <Label>Payment Status</Label>
            <OptionContainer>
              {paymentStatus.map((option) => (
                <OptionButton
                  key={option.label}
                  selected={selectedPaymentStatus === option.label}
                  onClick={() => setSelectedPaymentStatus(option.label)}
                  type="button"
                >
                  <input
                    type="radio"
                    checked={selectedPaymentStatus === option.label}
                    readOnly
                  />

                  {option.label}
                </OptionButton>
              ))}
            </OptionContainer>
          </PaymentWrapper>
        </div>

        <div className="mt-4 d-flex justify-content-end">
          <Col md="5">
            <ExpectedDDateContainer>
              <Label>Remarks</Label>
              <TextArea {...register("remarks")} />
            </ExpectedDDateContainer>
          </Col>
        </div>

        {/* <div className="mt-4 d-flex justify-content-end">
        <Col md={5}>
          <ExpectedDDateContainer>
            <Label>Expected Delivery Date</Label>
            <Input
              {...register("expectedDDate")}
              type="date"
              style={{ width: "70%", height: "35px" }}
            />
          </ExpectedDDateContainer>
        </Col>
      </div> */}
        <div className="mt-5 mb-4 d-flex gap-4 justify-content-end">
          <IconButton
            width="120px"
            border="1px solid #0539f4"
            color="#0539f4"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </IconButton>

          <IconButton
            width="120px"
            color="#ffffff"
            bg="#0539f4"
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </IconButton>
        </div>
      </form>
      <AddVendorModal
        Show={addVendorModal}
        handleCloseModal={handleCloseAddVendorModal}
        setAddedVendorNo={setAddedVendorNo}
      />
    </MainContainer>
  );
}

export default AddPurchase;
