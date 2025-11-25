import { useEffect, useState } from "react";

import CardImg from "../../../Assets/Icons/card.png";
import CashImg from "../../../Assets/Icons/cash.png";
import PhonePay from "../../../Assets/Icons/phone-pay.png";
import { Col, Form, Row } from "react-bootstrap";
import {
  CheckboxContainer,
  CheckboxLabel,
  ExpectedDDateContainer,
  InvoiceContainerDiv,
  Label,
  OptionButton,
  OptionContainer,
  OptionImage,
  PaymentWrapper,
  StyledRow,
  SummaryContainer,
  SummaryDetailsDiv,
  ToggleLabel,
  ToggleSwitch,
  ToggleWrapper,
  Value,
} from "../../Bill/Sub/AddBillsStyles";
import {
  DownArrowIcon,
  ErrorText,
  Input,
  StyledSelect,
  StyledSelectWrapper,
  TextArea,
} from "../../../Styles/Form Styles/FormStyles";
import ItemDetialsTable from "./ItemDetialsTable";
import IconButton from "../../../Components/Buttons/Icon Button/IconButton";

import InputAuto from "../../../Components/Inputs/AutoCompleteInput/InputAuto";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCustomerByPhone,
  GetCustomerList,
} from "../../../Redux/Api/Customer/action";
import { MainContainer } from "../../../Styles/CommonStyles";
import {
  FieldArrayWithId,
  useFieldArray,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import {
  AddInvoiceData,
  CheckInvoiceNum,
  ClearCheckInvoiceNum,
  ClearGetTransactionsByInvoice,
  EditInvoice,
  GetInvoiceById,
  GetInvoiceNum,
  GetInvoicePDF,
} from "../../../Redux/Api/Invoice/action";
import { GetSession } from "../../../Lib/Session";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import AddCustomerModal from "../../Customer/Sub/AddCustomerModal";
import {
  GetGstList,
  GetServiceFieldLists,
} from "../../../Redux/Api/Settings/action";

import { GetOrgDetails } from "../../../Redux/Api/Authentication/action";
import InvoicePDFModal from "./InvoicePDFModal";
import ItemDetailsTable from "./ItemDetialsTable";
import PayInvoiceModal from "./PayInvoiceModal";
import InputAutoV2 from "../../../Components/Inputs/AutoCompleteInput/InputAutoV2";
interface ServiceOption {
  label: string;
  value: number | string;
  cost?: number;
}
interface ServiceItem {
  incoiceId: string | number;
  service: {
    label: string;
    value: number | string;
    cost?: number;
  } | null;
  quantity: number | string;
  quantityRate: any;
  extraCharge: number | string;
  description: string;
  gstDetails: any;
  grossTotal: string | number;
}

type OptionType = {
  label: string;
  value: string;
};
interface FormData {
  custName: string;
  phoneNo: string;
  name: string;
  email: string;
  invoiceNo: any;
  invoiceDate: string;
  expectedDDate: Date;
  tax: any;
  discount: string;
  received: boolean;
  receivedAmount: string;
  notes: string;
  items: ServiceItem[];
}

type PaymentOption = "PhonePe" | "Card" | "Cash";
function AddInvoice() {
  const { id } = useParams();

  const navigate = useNavigate();
  const SessionData = GetSession();
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      phoneNo: "",
      name: "",
      email: "",
      invoiceNo: "",
      invoiceDate: new Date().toISOString().split("T")[0],
      expectedDDate: new Date(),
    },
  });

  const [items, setItems] = useState<ServiceItem[]>([
    {
      incoiceId: "",
      service: { label: "", value: "" },
      quantity: 1,
      quantityRate: 0,
      extraCharge: "",
      description: "",
      grossTotal: "",
      gstDetails: { taxId: "", taxName: "", taxPercentage: "", taxAmount: "" },
    },
  ]);

  const dispatch = useDispatch();
  const [ShowCreateCdModal, setShowCreateCdModal] = useState(false);
  const [gstComparisonResult, setGstComparisonResult] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [addedCustNo, setAddedCustNo] = useState("");
  const [addedCustName, setAddedCustName] = useState("");

  const [phoneSuggestion, setPhoneSuggestion] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("gpay");

  const [isReceivedChecked, setIsReceivedChecked] = useState(false);
  const [paidAmount, setPaidAmount] = useState("");

  const [selectedOption, setSelectedOption] = useState<{
    phone: string;
    customerName: string;
  }>({
    phone: "",
    customerName: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const [showPayInvoiceModal, setShowPayInvoiceModal] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [taxAmounts, setTaxAmounts] = useState({
    cgst: 0,
    sgst: 0,
    igst: 0,
  });
  const [balanceDue, setBalanceDue] = useState(0);
  const [taxMode, setTaxMode] = useState("exclusive"); // default

  const InvNumber = watch("invoiceNo");
  const CustName = watch("custName");

  useEffect(() => {
    console.log("CustName", CustName);
  }, [CustName]);

  const CustomerResponse: any = useSelector(
    (state: any) => state.CustomerReducers.GetCustomerList
  );

  const GstListResponse: any = useSelector(
    (state: any) => state.SettingReducers.GetGstListRes
  );
  const CustomerDetailsResponse: any = useSelector(
    (state: any) => state.CustomerReducers.GetCustomerByPhone
  );
  const InoviceDetails: any = useSelector(
    (state: any) => state.InvoiceReducers.GetInvoiceById
  );
  const OrgResponse: any = useSelector(
    (state: any) => state.LoginReducer.GetOrgDetailsRes
  );
  const AddCustomerResponse: any = useSelector(
    (state: any) => state.CustomerReducers.AddCustomerRes
  );
  const AddServiceFieldResponse: any = useSelector(
    (state: any) => state.SettingReducers.AddServiceFieldRes
  );

  const AddInvoiceResponse: any = useSelector(
    (state: any) => state.InvoiceReducers.AddInvoiceRes
  );

  const InvoicePDFResponse: any = useSelector(
    (state: any) => state.InvoiceReducers.GetInvoicePDF
  );
  const InvoiceNumberResponse: any = useSelector(
    (state: any) => state.InvoiceReducers.GetInvoiceNumRes
  );

  const CheckInvNumberResponse: any = useSelector(
    (state: any) => state.InvoiceReducers.CheckInvoiceNumRes
  );

  const invoiceItemsList = items.map((item) => {
    const quantity = Number(item.quantity || 0);
    const rate = Number(item.quantityRate || 0);
    const extraCharge = Number(item.extraCharge || 0);
    const description = item.description;

    const taxAmount = Number(item.gstDetails?.taxAmount || 0);

    const grossTotal = quantity * rate + taxAmount;
    let taxAmountCgst = "";
    let taxAmountSgst = "";
    let taxAmountIgst = "";

    if (gstComparisonResult === "same") {
      const halfTax = taxAmount / 2;
      taxAmountCgst = halfTax.toFixed(2);
      taxAmountSgst = halfTax.toFixed(2);
    } else if (gstComparisonResult === "different") {
      taxAmountIgst = taxAmount.toFixed(2);
    }

    return {
      serviceId: item.service?.value ?? null,
      serviceName: item.service?.label ?? "",
      taxId: item.gstDetails?.taxId ?? "",
      taxName: item.gstDetails?.taxName ?? "",
      taxPercent: item.gstDetails?.taxPercentage ?? "",
      taxAmount: item.gstDetails?.taxAmount ?? "",
      taxAmountCgst,
      taxAmountSgst,
      taxAmountIgst,
      quantity,
      rate,
      extraCharge,
      description,
      grossTotal: parseFloat(grossTotal.toFixed(2)),
      addedByUser: SessionData?.user?.addedByUser ?? null,
    };
  });

  const totalGrossAmount = invoiceItemsList.reduce(
    (acc, item) => acc + item.quantity * item.rate,
    0
  );
  const totalTaxAmount = invoiceItemsList.reduce(
    (acc, item) => acc + Number(item.taxAmount || 0),
    0
  );

  const custOptions =
    CustomerResponse?.map((data: any) => ({
      label: `${data.phone} - ${data.customerName}`,
      value: data.phone,
      customerName: data.customerName, // 👈 Important
    })) || [];

  // const taxDetails = watch("tax") ? JSON.parse(watch("tax")) : null;

  // const discount = Number(watch("discount") || 0);
  // const tax = Number(taxDetails?.percentage || 0);
  const receivedAmount = id
    ? InoviceDetails?.invoiceAmountPaid
    : Number(paidAmount || 0);

  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => {
    const qty = Number(item.quantity || 0);
    const rate = Number(item.quantityRate || 0);
    const extra = Number(item.extraCharge || 0);
    return acc + qty * rate + extra;
  }, 0);

  // Apply discount and tax
  // const discountedTotal = subtotal - discount;
  // const taxAmount = (discountedTotal * tax) / 100;
  const grandTotal = subtotal + totalTaxAmount;

  // Net amount = grandTotal
  const netAmount = grandTotal;

  useEffect(() => {
    if (id) {
      if (InoviceDetails?.invoiceGrandTotal != grandTotal) {
        const updatedBalanceDue =
          grandTotal - (InoviceDetails?.invoiceAmountPaid || 0);
        setBalanceDue(updatedBalanceDue);
      } else {
        setBalanceDue(InoviceDetails?.invoiceAmountBalance);
      }
    } else {
      setBalanceDue(netAmount - receivedAmount);
    }
  }, [grandTotal, InoviceDetails, netAmount, receivedAmount]);

  const handleOpenCreateCdModal = () => {
    setShowCreateCdModal(true);
  };
  const handleCloseCreateCdModal = () => {
    setShowCreateCdModal(false);
  };
  const handlePdfModalClose = () => {
    navigate("/home/invoice/list");
    setShowModal(false);
  };
  const handleToggle = () => {
    setTaxMode((prev) => (prev === "exclusive" ? "inclusive" : "exclusive"));
  };
  const handleInvoiceBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      dispatch(CheckInvoiceNum(value) as any);
    }
  };
  const options: { label: PaymentOption; icon: string }[] = [
    { label: "PhonePe", icon: PhonePay },
    { label: "Card", icon: CardImg },
    { label: "Cash", icon: CashImg },
  ];

  const InvoiceNo = InoviceDetails?.invoiceNumber;
  const InvoiceDate = InoviceDetails?.invoiceDate;

  useEffect(() => {
    if (SessionData?.user?.organizationId) {
      dispatch(GetOrgDetails(SessionData?.user?.organizationId) as any);
    }
  }, [SessionData?.user?.organizationId]);
  useEffect(() => {
    dispatch(GetCustomerList(null) as any);
  }, [AddCustomerResponse?.status === "Success"]);
  useEffect(() => {
    dispatch(GetServiceFieldLists(null) as any);
  }, [AddServiceFieldResponse]);
  useEffect(() => {
    dispatch(GetGstList(null) as any);
  }, []);
  useEffect(() => {
    if (selectedOption.phone) {
      dispatch(GetCustomerByPhone({ data: selectedOption.phone }) as any);
    }
  }, [selectedOption]);

  useEffect(() => {
    if (!id) {
      dispatch(GetInvoiceNum(SessionData?.user?.organizationId) as any);
    }
  }, [SessionData?.user?.organizationId]);

  useEffect(() => {
    if (id) {
      dispatch(
        GetInvoiceById({
          id: id,
        }) as any
      );
    }
  }, [id]);

  useEffect(() => {
    if (addedCustNo && selectedOption.phone !== addedCustNo) {
      setPhoneSuggestion(false);
    }
  }, [selectedOption, addedCustNo]);

  useEffect(() => {
    if (AddCustomerResponse?.status === "Success" && addedCustNo) {
      setSelectedOption({ phone: addedCustNo, customerName: addedCustName });
      setPhoneSuggestion(true);
    }
  }, [AddCustomerResponse]);

  // useEffect(() => {
  //   if (isReceivedChecked) {
  //     const currentValue = watch("receivedAmount");
  //     if (!currentValue || currentValue === "0") {
  //       setValue(
  //         "receivedAmount",
  //         balanceDue.toLocaleString("en-IN", {
  //           minimumFractionDigits: 2,
  //         })
  //       );
  //     }
  //   }
  // }, [isReceivedChecked, balanceDue, setValue]);
  useEffect(() => {
    if (CheckInvNumberResponse?.id && CheckInvNumberResponse?.id != id) {
      toast.error(CheckInvNumberResponse?.message);
    }
  }, [CheckInvNumberResponse, id]);

  useEffect(() => {
    if (id && InoviceDetails) {
      setSelectedOption({
        phone: InoviceDetails?.customerPhone || "",
        customerName: InoviceDetails?.customerName || "",
      });
      setValue("invoiceNo", InoviceDetails?.invoiceNumber);
      setValue("custName", InoviceDetails?.customerName);
      setValue("invoiceDate", InoviceDetails?.invoiceDate);
      // setValue("expectedDDate", InoviceDetails?.expectedDeliveryDate);
      // setValue("discount", InoviceDetails?.invoiceDiscount);
      setValue("receivedAmount", InoviceDetails?.invoiceAmountPaid);
      setValue("tax", InoviceDetails?.invoiceTax);
      setValue("notes", InoviceDetails?.invoiceNotes);
      // Map item list

      if (InoviceDetails.invoiceItemsList?.length) {
        const itemData = InoviceDetails.invoiceItemsList.map((item: any) => ({
          service: {
            label: item.serviceName,
            value: item.serviceId,
          },
          incoiceId: item.invoiceItemId,
          quantity: item.quantity,
          quantityRate: item.rate,
          extraCharge: item.extraCharge,

          description: item.description,
          gstDetails: {
            taxId: item.taxId,
            taxName: item.taxName,
            taxPercentage: item.taxPercent,
            taxAmount: item.taxAmount,
          },
        }));

        setItems(itemData);
      }
    }
  }, [id, InoviceDetails, setValue]);

  useEffect(() => {
    if (CustomerDetailsResponse?.customerName) {
      setValue("custName", CustomerDetailsResponse?.customerName);
    }
  }, [CustomerDetailsResponse]);
  useEffect(() => {
    if (InvoiceNumberResponse) {
      setValue("invoiceNo", InvoiceNumberResponse);
    }
  }, [InvoiceNumberResponse]);

  useEffect(() => {
    const customerGst = CustomerDetailsResponse?.gstNumber;
    const orgGst = OrgResponse?.orgGstinNumber;

    if (!customerGst) {
      setGstComparisonResult("same");
    } else {
      const customerStateCode = customerGst.slice(0, 2).trim().normalize();
      const orgStateCode = orgGst?.slice(0, 3).trim().normalize();

      if (customerStateCode === orgStateCode) {
        setGstComparisonResult("same");
      } else {
        setGstComparisonResult("different");
      }
    }
  }, [CustomerDetailsResponse, OrgResponse]);

  useEffect(() => {
    // const taxAmount = (discountedTotal * tax) / 100;

    if (gstComparisonResult === "same") {
      setTaxAmounts({
        cgst: totalTaxAmount / 2,
        sgst: totalTaxAmount / 2,
        igst: 0,
      });
    } else if (gstComparisonResult === "different") {
      setTaxAmounts({
        cgst: 0,
        sgst: 0,
        igst: totalTaxAmount,
      });
    } else {
      setTaxAmounts({
        cgst: 0,
        sgst: 0,
        igst: 0,
      });
    }
  }, [totalTaxAmount, gstComparisonResult, grandTotal]);
  // useEffect(() => {
  //   // Clean non-numeric characters
  //   let cleaned = selectedOption.replace(/\D/g, "");

  //   // Truncate to 10 digits if longer
  //   if (cleaned.length > 10) {
  //     cleaned = cleaned.slice(0, 10);
  //   }

  //   // Update state only if modified
  //   if (cleaned !== selectedOption) {
  //     setSelectedOption(cleaned);
  //   }

  //   // Show validation error if not exactly 10 digits and not empty
  //   if (cleaned && cleaned.length !== 10) {
  //     setPhoneError("Phone number must be exactly 10 digits");
  //   } else {
  //     setPhoneError("");
  //   }
  // }, [selectedOption]); // Pre-calculate invoiceItemsList before creating the payload

  const openModal = (invoiceId: string) => {
    if (!selectedOption.phone && !selectedOption.customerName) {
      toast.error("Please enter the Phone number before submitting the form.");
      return;
    }

    if (
      !items.some(
        (item) => item.service?.value && (item.quantity || item.quantityRate)
      )
    ) {
      toast.error(
        "Please add at least one service with required details before submitting the form."
      );
      return;
    }
    if (CheckInvNumberResponse?.id && CheckInvNumberResponse?.id != id) {
      toast.error(CheckInvNumberResponse?.message);
      return;
    }
    setSelectedInvoiceId(invoiceId);
    setShowPayInvoiceModal(true);
    dispatch(ClearGetTransactionsByInvoice());
  };
  const onSubmit = (data: FormData) => {
    if (!selectedOption.phone && !selectedOption.customerName) {
      toast.error("Please enter the Phone number before submitting the form.");
      return;
    }

    if (
      !items.some(
        (item) => item.service?.value && (item.quantity || item.quantityRate)
      )
    ) {
      toast.error(
        "Please add at least one service with required details before submitting the form."
      );
      return;
    }
    if (CheckInvNumberResponse?.id && CheckInvNumberResponse?.id != id) {
      // console.log("id", CheckInvNumberResponse?.id);
      // console.log("id", id);

      toast.error(CheckInvNumberResponse?.message);
      return;
    }

    const payload = {
      customerId: CustomerDetailsResponse?.customerId ?? null,
      customerName: selectedOption.customerName ?? "",
      customerPhone: selectedOption.phone ?? "",
      customerEmail: CustomerDetailsResponse?.email ?? "",
      customerGstin: CustomerDetailsResponse?.gstNumber ?? "",
      invoiceTaxMode: taxMode,
      invoiceNumber: data.invoiceNo?.toString() ?? "",
      invoiceDate: data.invoiceDate ? data.invoiceDate : "",
      invoiceDueDate: data.invoiceDate ? data.invoiceDate : "",

      // expectedDeliveryDate: data.expectedDDate ?? "",

      invoicePaymentMode: paymentMethod ?? "",
      invoicePaymentTerms: "",
      invoicePaymentTermsId: null,
      invoicePaymentTermNoOfDays: null,
      invoiceSalesPersonId: null,

      invoiceConfirmPaymentReceived: data.received ? 1 : 0,
      invoiceDepositTo: null,

      invoiceSubTotal: Number(subtotal.toFixed(2)),

      invoiceDiscount: "",
      invoiceNetAmount: Number(totalGrossAmount.toFixed(2)),
      invoiceGrandTotal: Number(grandTotal.toFixed(2)),

      // invoiceTax: taxAmount,
      // invoiceTaxId: Number(taxDetails?.gstId || 0),
      // invoiceTaxName: taxDetails?.gstType,
      // invoiceTaxPercent: gst,

      invoiceAmountPaid: Number(receivedAmount.toFixed(2)),
      invoiceAmountBalance: Number(balanceDue.toFixed(2)),

      invoiceShippigCharges: 0.0,
      invoiceAdjustment: 0.0,
      invoiceRoundOff: 0.0,

      invoiceCustomerNotes: "",
      invoiceStatus: data.received ? 1 : 0,
      invoiceNotes: data.notes,
      organizationId: SessionData?.user?.organizationId ?? null,
      branchId: SessionData?.user?.branchId ?? null,
      addedByUser: SessionData?.user?.addedByUser ?? null,

      taxBreakupList:
        gstComparisonResult === "same"
          ? [
              {
                taxType: "CGST",
                taxPercentage: "",
                taxAmount: parseFloat(taxAmounts.cgst.toFixed(2)),
              },
              {
                taxType: "SGST",
                taxPercentage: "",
                taxAmount: parseFloat(taxAmounts.sgst.toFixed(2)),
              },
            ]
          : gstComparisonResult === "different"
          ? [
              {
                taxType: "IGST",
                taxPercentage: "",
                taxAmount: parseFloat(taxAmounts.igst.toFixed(2)),
              },
            ]
          : [],

      invoiceItemsList: invoiceItemsList,
    };

    if (id) {
      const editPayload = {
        invoiceId: id,
        customerId: CustomerDetailsResponse?.customerId ?? null,
        customerName: selectedOption.customerName ?? "",
        customerPhone: selectedOption.phone ?? "",
        customerEmail: CustomerDetailsResponse?.email ?? "",
        customerGstin: CustomerDetailsResponse?.gstNumber ?? "",
        invoiceNumber: data.invoiceNo?.toString() ?? "",
        invoiceDate: data.invoiceDate ? data.invoiceDate : "",
        invoiceDueDate: data.invoiceDate ? data.invoiceDate : "",
        invoiceTaxMode: taxMode,
        // expectedDeliveryDate: data.expectedDDate ?? "",

        invoicePaymentMode: paymentMethod ?? "",
        invoicePaymentTerms: "", // Can be filled later
        invoicePaymentTermsId: null,
        invoicePaymentTermNoOfDays: null,
        invoiceSalesPersonId: null,

        invoiceConfirmPaymentReceived: data.received ? 1 : 0,
        invoiceDepositTo: null,

        // invoiceTax: Number(data.tax),
        // invoiceTaxId: 1,

        invoiceSubTotal: Number(subtotal.toFixed(2)),

        invoiceDiscount: "",
        invoiceNetAmount: Number(netAmount.toFixed(2)),
        invoiceGrandTotal: Number(grandTotal.toFixed(2)),

        invoiceAmountPaid: Number(receivedAmount.toFixed(2)),
        invoiceAmountBalance: Number(balanceDue.toFixed(2)),

        invoiceNotes: data.notes,

        invoiceShippigCharges: 0.0,
        invoiceAdjustment: 0.0,
        invoiceRoundOff: 0.0,

        invoiceCustomerNotes: "",
        invoiceStatus: data.received ? 1 : 0, // Use 0 for "Draft", 1 for "Confirmed", etc.

        organizationId: SessionData?.user?.organizationId ?? null,
        branchId: SessionData?.user?.branchId ?? null,
        editedByUser: SessionData?.user?.editByUser,
        id: id,

        taxBreakupList:
          gstComparisonResult === "same"
            ? [
                {
                  taxType: "CGST",
                  taxPercentage: "",
                  taxAmount: parseFloat(taxAmounts.cgst.toFixed(2)),
                },
                {
                  taxType: "SGST",
                  taxPercentage: "",
                  taxAmount: parseFloat(taxAmounts.sgst.toFixed(2)),
                },
              ]
            : gstComparisonResult === "different"
            ? [
                {
                  taxType: "IGST",
                  taxPercentage: "",
                  taxAmount: parseFloat(taxAmounts.igst.toFixed(2)),
                },
              ]
            : [],

        invoiceItemsList: items.map((item) => {
          const ItemId = Number(item.incoiceId || 0);
          const quantity = Number(item.quantity || 0);
          const rate = Number(item.quantityRate || 0);
          const extraCharge = Number(item.extraCharge || 0);
          const description = item.description;

          const grossTotal = quantity * rate + extraCharge;
          const taxAmount = Number(item.gstDetails?.taxAmount || 0);

          let taxAmountCgst = "";
          let taxAmountSgst = "";
          let taxAmountIgst = "";

          if (gstComparisonResult === "same") {
            const halfTax = taxAmount / 2;
            taxAmountCgst = halfTax.toFixed(2);
            taxAmountSgst = halfTax.toFixed(2);
          } else if (gstComparisonResult === "different") {
            taxAmountIgst = taxAmount.toFixed(2);
          }
          return {
            invoiceItemId: ItemId,
            serviceId: item.service?.value ?? null,
            serviceName: item.service?.label ?? "",
            taxId: item.gstDetails?.taxId ?? "",
            taxName: item.gstDetails?.taxName ?? "",
            taxPercent: item.gstDetails?.taxPercentage ?? "",
            taxAmount: item.gstDetails?.taxAmount ?? "",
            taxAmountCgst,
            taxAmountSgst,
            taxAmountIgst,
            quantity,
            rate,
            extraCharge,
            description,
            grossTotal: parseFloat(grossTotal.toFixed(2)),
            editedByUser: SessionData?.user?.editByUser,
          };
        }),
      };
      // console.log("Final Payload Sent:", editPayload);
      dispatch(EditInvoice(editPayload) as any);
    } else {
      // console.log("payload", payload);

      dispatch(AddInvoiceData(payload) as any);
    }
    navigate(-1);
  };
  useEffect(() => {
    if (AddInvoiceResponse) {
      dispatch(GetInvoicePDF({ id: AddInvoiceResponse?.data }) as any);
      setShowModal(true);
    }
  }, [AddInvoiceResponse]);

  return (
    <MainContainer>
      <h4>{id ? "Edit" : " Add"} New Invoice</h4>
      {/* <Row className="mt-4">
        <Col>
          <ConmmonContainer>
            <div>Total Purchase</div>
            <div className="d-flex gap-2 align-items-center justiy-content-center">
              <img src={Tag} alt="" /> <h5 className="mt-2">123</h5>
            </div>
          </ConmmonContainer>
        </Col>

        <Col>
          {" "}
          <ConmmonContainer>
            <div>Total Lent Amounts </div>
            <div className="d-flex gap-2 align-items-center justiy-content-center">
              <img src={MoneyInHand} alt="" /> <h5 className="mt-2">₹ 4,355</h5>
            </div>
          </ConmmonContainer>
        </Col>
      </Row> */}

      <div className="mt-4">
        <div>CUSTOMER DETAILS</div>
        <Row className="mt-3">
          <Col className="d-flex flex-column gap-3" md={4}>
            <InputAutoV2
              pholder="Customer Phone or Name"
              data={custOptions}
              initialValue={selectedOption.phone}
              onSelected={(val: any) => {
                setSelectedOption({
                  phone: val.value,
                  customerName: val.customerName,
                });
              }}
              onChange={() => setValue("custName", "")}
              noOptionButtonLabel="Add New Customer"
              onNoOptionClick={handleOpenCreateCdModal}
              hideSuggestions={phoneSuggestion}
            />

            <Input
              type="text"
              {...register("custName")}
              value={selectedOption.customerName}
              readOnly
            />
            {/* {phoneError && (
              <ErrorText>
                {phoneError}
              </ErrorText>
            )} */}
          </Col>

          <Col className="d-flex flex-column align-items-end gap-3">
            <InvoiceContainerDiv>
              <div>Invoice Number</div>
              <Input
                type="text"
                {...register("invoiceNo")}
                onChange={handleInvoiceBlur}
                style={{ width: "120px", height: "30px" }}
              />
              {/* <div>{InvoiceNo}</div> */}
            </InvoiceContainerDiv>

            <InvoiceContainerDiv>
              <div>Invoice Date</div>
              <Input
                type="date"
                {...register("invoiceDate")}
                style={{ width: "120px", height: "30px" }}
                max={new Date().toISOString().split("T")[0]} // disables future dates
              />
            </InvoiceContainerDiv>
          </Col>
        </Row>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="mt-4 p-0">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Item/Service Details</h5>
            <ToggleWrapper>
              <ToggleLabel>Tax Mode</ToggleLabel>
              <ToggleLabel active={taxMode === "exclusive"}>
                Exclusive
              </ToggleLabel>
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={taxMode === "inclusive"}
                  onChange={handleToggle}
                />
                <span />
              </ToggleSwitch>
              <ToggleLabel active={taxMode === "inclusive"}>
                Inclusive
              </ToggleLabel>
            </ToggleWrapper>
          </div>
          <ItemDetailsTable
            items={items}
            setItems={setItems}
            taxMode={taxMode}
          />
        </div>

        <div className="mt-4">
          <SummaryContainer>
            <StyledRow>
              <SummaryDetailsDiv>
                <Label>Net amount</Label>
                <Value>₹ {totalGrossAmount.toLocaleString("en-IN")}</Value>
              </SummaryDetailsDiv>
            </StyledRow>
            {/* <StyledRow>
              <SummaryDetailsDiv>
                <Label>Tax</Label>
                <StyledSelectWrapper style={{ width: "150px" }}>
                  <StyledSelect
                    {...register("tax")}
                    style={{ width: "150px", height: "35px" }}
                  >
                    <option value="">Select Tax</option>
                    {GstListResponse?.map((item: any, index: number) => (
                      <option
                        key={index}
                        value={JSON.stringify({
                          gstId: item.gstId,
                          percentage: item.percentage,
                          gstType: item.gstType,
                        })}
                      >
                        {item.gstType} - {item.percentage}%
                      </option>
                    ))}
                  </StyledSelect>

                  <DownArrowIcon />
                </StyledSelectWrapper>
              </SummaryDetailsDiv>
            </StyledRow> */}
            {gstComparisonResult === "same" && (
              <>
                <StyledRow>
                  <SummaryDetailsDiv>
                    <Label>CGST</Label>
                    <Value>
                      ₹{" "}
                      {taxAmounts.cgst.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </Value>
                  </SummaryDetailsDiv>
                </StyledRow>
                <StyledRow>
                  <SummaryDetailsDiv>
                    <Label>SGST</Label>
                    <Value>
                      ₹{" "}
                      {taxAmounts.sgst.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </Value>
                  </SummaryDetailsDiv>
                </StyledRow>
              </>
            )}

            {gstComparisonResult === "different" && (
              <StyledRow>
                <SummaryDetailsDiv>
                  <Label>IGST</Label>
                  <Value>
                    ₹{" "}
                    {taxAmounts.igst.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </Value>
                </SummaryDetailsDiv>
              </StyledRow>
            )}

            {/* <StyledRow>
              <SummaryDetailsDiv>
                <div className="d-flex flex-column">
                  <Label>Discount</Label>
                  <ErrorText
                    style={{
                      fontSize: "11px",
                      color: "#9A9A9A",
                      marginTop: "-5px",
                    }}
                  >
                    (Discount cannot exceed Grand Total)
                  </ErrorText>
                </div>
                <Input
                  type="number"
                  {...register("discount", {
                    onChange: (e) => {
                      const value = parseFloat(e.target.value);

                      if (!isNaN(value) && value > grandTotal) {
                        // Clear discount field
                        setValue("discount", "");
                      }
                    },
                  })}
                  placeholder="Enter discount"
                  style={{ width: "150px", height: "35px" }}
                />
              </SummaryDetailsDiv>
            </StyledRow> */}

            <StyledRow>
              <SummaryDetailsDiv>
                <Label>Grand Total</Label>

                <Value>
                  ₹{" "}
                  {netAmount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </Value>
              </SummaryDetailsDiv>
            </StyledRow>
            {/* <StyledRow>
              <SummaryDetailsDiv>
                <CheckboxContainer>
                  <input
                    type="checkbox"
                    id="received"
                    checked={isReceivedChecked}
                    onChange={(e) => setIsReceivedChecked(e.target.checked)}
                  />
                  <CheckboxLabel htmlFor="received">Received</CheckboxLabel>
                </CheckboxContainer>
                <Input
                  {...register("receivedAmount", {
                    onChange: (e) => {
                      const value = parseFloat(e.target.value) || 0;
                      if (value > netAmount) {
                        setValue(
                          "receivedAmount",
                          netAmount.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                          })
                        ); // set to max
                      }
                    },
                  })}
                  placeholder="Received ₹"
                  style={{ width: "150px", height: "35px" }}
                />
              </SummaryDetailsDiv>
            </StyledRow>

            <StyledRow>
              <SummaryDetailsDiv>
                <Label style={{ color: "#d633ff" }}>Balance Due</Label>
                <Value style={{ color: "#d633ff" }}>
                  ₹{" "}
                  {balanceDue.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </Value>
              </SummaryDetailsDiv>
            </StyledRow> */}
            {id && (
              <StyledRow>
                <SummaryDetailsDiv>
                  <Label style={{ color: "#d633ff" }}>Balance Due</Label>
                  <Value style={{ color: "#d633ff" }}>₹ {balanceDue}</Value>
                </SummaryDetailsDiv>
              </StyledRow>
            )}
          </SummaryContainer>
        </div>

        {/* <div className="mt-4">
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
        </div> */}
        <div className="mt-4 d-flex justify-content-end">
          <Col md="5">
            <ExpectedDDateContainer>
              <Label>Note</Label>
              <TextArea {...register("notes")} />
            </ExpectedDDateContainer>
          </Col>
        </div>

        {id ? (
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
        ) : (
          <div className="mt-5 mb-4 d-flex  justify-content-between">
            <Col md={3}>
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
            </Col>
            <Col md={3} className="d-flex gap-4 justify-content-end">
              <IconButton
                width="120px"
                border="1px solid #0539f4"
                color="#0539f4"
                onClick={handleSubmit(onSubmit)}
                type="button"
              >
                Save
              </IconButton>

              <IconButton
                width="120px"
                color="#ffffff"
                bg="#0539f4"
                type="button"
                onClick={() => openModal("")}
              >
                Pay
              </IconButton>
            </Col>
          </div>
        )}
      </form>
      <AddCustomerModal
        Show={ShowCreateCdModal}
        handleCloseModal={handleCloseCreateCdModal}
        setAddedCustNo={setAddedCustNo}
        setAddedCustName={setAddedCustName}
      />
      <InvoicePDFModal
        show={showModal}
        handleClose={handlePdfModalClose}
        PdfData={InvoicePDFResponse}
      />
      <PayInvoiceModal
        show={showPayInvoiceModal}
        onHide={() => setShowPayInvoiceModal(false)}
        customerName={CustomerDetailsResponse?.customerName ?? ""}
        dueAmount={balanceDue}
        onSubmit={handleSubmit(onSubmit)}
        setInputAmount={setPaidAmount}
        inputAmount={paidAmount}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
    </MainContainer>
  );
}

export default AddInvoice;
