import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import {
  AddItemButton,
  DeleteIcon,
  Table,
  TableWrapper,
  TBody,
  Td,
  Th,
  Thead,
} from "../../../Styles/Table Styles/ServiceTableStyles";
import {
  DownArrowIcon,
  Input,
  StyledSelect,
  StyledSelectWrapper,
} from "../../../Styles/Form Styles/FormStyles";
import { useSelector } from "react-redux";
import InputAuto from "../../../Components/Inputs/AutoCompleteInput/InputAuto";
import AddServiceFieldModal from "../../Settings/Sub/Service Field/AddServiceFieldModal";
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
  quantityRate: number | string;
  extraCharge: number | string;
  description: string;
  gstDetails: any;
  grossTotal: string | number;
}

interface ItemDetailsTableProps {
  items: ServiceItem[];

  setItems: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  taxMode: any;
}

const ItemDetailsTable: React.FC<ItemDetailsTableProps> = ({
  items,
  setItems,
  taxMode,
}) => {
  const [ShowCreateCdModal, setShowCreateCdModal] = useState(false);
  const [serviceSuggestion, setServiceSuggestion] = useState(false);
  const [addedServiceName, setAddedServiceName] = useState("");

  const ServiceListResponse: any = useSelector(
    (state: any) => state.SettingReducers.GetServiceFieldListRes
  );
  const AddServiceFieldResponse: any = useSelector(
    (state: any) => state.SettingReducers.AddServiceFieldRes
  );
  const GstListResponse: any = useSelector(
    (state: any) => state.SettingReducers.GetGstListRes
  );
  const ServiceData = ServiceListResponse?.map((data: any) => ({
    value: data.serviceId,
    label: data.serviceName,
    cost: data.cost,
  }));

  const handleItemChange = (index: number, field: string, value: any) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      const currentItem = { ...updatedItems[index], [field]: value };
      console.log("prevItems", prevItems);

      const quantity = Number(currentItem.quantity || 0);
      const rate = Number(currentItem.quantityRate || 0);
      const grossTotal = quantity * rate;
      console.log("items", items);

      // If gstDetails exist, recalculate taxAmount
      if (taxMode != "inclusive" && currentItem.gstDetails?.taxPercentage) {
        currentItem.gstDetails = {
          ...currentItem.gstDetails,
          taxAmount: (grossTotal * currentItem.gstDetails.taxPercentage) / 100,
        };
        console.log("taxAmount2", currentItem.gstDetails);
      }

      updatedItems[index] = currentItem;
      return updatedItems;
    });
  };
  const handleInclusiveTaxCalculation = (
    grossTotal: any,
    taxPercentage: any,
    quantity: any
  ) => {
    // Round grossTotal first
    // const roundedGross = Number(grossTotal.toFixed(2));

    // Calculate taxAmount from grossTotal (reverse calculation) and round
    const taxAmount = Number(
      (grossTotal * taxPercentage) / (100 + taxPercentage)
    ).toFixed(2);

    // Calculate rateExcludingTax and round
    const rateExcludingTax = Number(grossTotal - taxAmount);

    // Calculate rate per unit and round
    const rate = Number(quantity > 0 ? rateExcludingTax / quantity : 0);

    console.log("taxAmount", taxAmount);
    console.log("rateExcludingTax", rateExcludingTax);
    console.log("rate", rate);

    return {
      taxAmount,
      rate,
      rateExcludingTax,
    };
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        incoiceId: "",
        service: null,
        quantity: 1,
        quantityRate: 0,
        extraCharge: "",
        description: "",
        grossTotal: "",
        gstDetails: {
          taxId: "",
          taxName: "",
          taxPercentage: "",
          taxAmount: "",
        },
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (
      AddServiceFieldResponse?.status === "Success" &&
      ServiceListResponse?.length
    ) {
      const timer = setTimeout(() => {
        const newlyAddedService = ServiceListResponse?.[0];

        if (!newlyAddedService) return;

        const updatedItems = [...items];
        const preferredIndex = items.length - 1; // or any dynamic index if needed

        updatedItems[preferredIndex] = {
          ...updatedItems[preferredIndex],
          service: {
            label: newlyAddedService.serviceName,
            value: newlyAddedService.serviceId,
            cost: newlyAddedService.cost ?? 0,
          },
          quantityRate: newlyAddedService.cost ?? "",
        };

        setItems(updatedItems);
      }, 500); // 4 seconds delay

      return () => clearTimeout(timer); // cleanup on dependency change
    }
  }, [AddServiceFieldResponse, ServiceListResponse]);

  return (
    <TableWrapper>
      <Table>
        <Thead>
          <tr>
            <Th>Service</Th>
            <Th>Description</Th>
            <Th>Quantity</Th>
            {taxMode === "inclusive" ? <Th>Gross Total</Th> : <Th> Rate</Th>}
            <Th>Tax</Th>
            <Th>Tax Amount</Th>
            {taxMode === "inclusive" ? <Th>Rate</Th> : <Th> Gross Total </Th>}

            <Th></Th>
          </tr>
        </Thead>
        <TBody>
          {items.map((item, index) => {
            const qty = Number(item.quantity || 0);
            const rate = Number(item.quantityRate || 0);
            const grossTotal = qty * rate;

            return (
              <tr key={index}>
                <Td>
                  <InputAuto
                    pholder="Select service"
                    data={ServiceData?.map((item: any) => item.label) || ""}
                    initialValue={item?.service?.label || ""}
                    onChange={(val: string) => {
                      if (val === "") {
                        handleItemChange(index, "service", {
                          label: "",
                          value: "",
                        });
                        handleItemChange(index, "quantityRate", "");
                      }
                    }}
                    onSelected={(selectedLabel) => {
                      const selected = ServiceData.find(
                        (s: any) => s.label === selectedLabel
                      );
                      if (selected) {
                        handleItemChange(index, "service", {
                          label: selected.label,
                          value: selected.value,
                        });
                        handleItemChange(index, "quantityRate", selected.cost);
                      } else {
                        handleItemChange(index, "service", {
                          label: "",
                          value: "",
                        });
                        handleItemChange(index, "quantityRate", "");
                      }
                    }}
                    noOptionButtonLabel="Add New Service"
                    onNoOptionClick={() => setShowCreateCdModal(true)}
                    hideSuggestions={item?.service?.label ? true : false}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                  />
                </Td>
                <Td>
                  <Input
                    style={{ width: "120px" }}
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                  />
                </Td>

                {taxMode === "inclusive" ? (
                  <Td>
                    <Input
                      style={{ width: "120px" }}
                      type="number"
                      value={item.grossTotal}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value >= 0 || e.target.value === "") {
                          // Update grossTotal
                          handleItemChange(index, "grossTotal", e.target.value);

                          // If tax is selected, recalculate taxAmount and rate
                          if (item.gstDetails?.taxPercentage) {
                            const calculations = handleInclusiveTaxCalculation(
                              value || 0,
                              item.gstDetails.taxPercentage,
                              item.quantity || 1
                            );

                            // Update tax details
                            const updatedGstDetails = {
                              ...item.gstDetails,
                              taxAmount: calculations.taxAmount,
                            };

                            console.log("updatedGstDetails", updatedGstDetails);

                            handleItemChange(
                              index,
                              "gstDetails",
                              updatedGstDetails
                            );
                            handleItemChange(
                              index,
                              "quantityRate",
                              calculations.rate
                            );
                          }
                        }
                      }}
                    />
                  </Td>
                ) : (
                  <Td>
                    <Input
                      style={{ width: "120px" }}
                      type="number"
                      value={item.quantityRate ?? ""} // show raw value while typing
                      onBlur={(e) => {
                        // format to 2 decimals only when leaving input
                        if (e.target.value !== "") {
                          handleItemChange(
                            index,
                            "quantityRate",
                            Number(e.target.value).toFixed(2)
                          );
                        }
                      }}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || parseFloat(value) >= 0) {
                          handleItemChange(index, "quantityRate", value);
                        }
                      }}
                    />
                  </Td>
                )}

                <Td>
                  <StyledSelect
                    value={JSON.stringify({
                      gstId: item.gstDetails.taxId,
                      percentage: item.gstDetails.taxPercentage,
                      gstType: item.gstDetails.taxName,
                    })}
                    style={{ width: "120px", height: "38px" }}
                    onChange={(e) => {
                      const selectedValue = JSON.parse(e.target.value);
                      const grossTotal = Number(item.grossTotal || 0);

                      let updatedGstDetails;

                      if (taxMode === "inclusive") {
                        // For inclusive tax, calculate taxAmount from grossTotal
                        const calculations = handleInclusiveTaxCalculation(
                          grossTotal,
                          selectedValue.percentage,
                          item.quantity || 1
                        );

                        updatedGstDetails = {
                          taxId: selectedValue.gstId,
                          taxName: selectedValue.gstType,
                          taxPercentage: selectedValue.percentage,
                          taxAmount: calculations.taxAmount,
                        };
                        console.log("items", items);
                        // Also update the rate
                        handleItemChange(
                          index,
                          "quantityRate",
                          calculations.rate
                        );
                      } else {
                        // Your existing exclusive tax calculation
                        const qty = Number(item.quantity || 0);
                        const rate = Number(item.quantityRate || 0);
                        const grossTotalCalc = qty * rate;

                        updatedGstDetails = {
                          taxId: selectedValue.gstId,
                          taxName: selectedValue.gstType,
                          taxPercentage: selectedValue.percentage,
                          taxAmount:
                            (grossTotalCalc * selectedValue.percentage) / 100,
                        };
                      }

                      handleItemChange(index, "gstDetails", updatedGstDetails);
                    }}
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
                </Td>
                <Td>
                  <Input
                    style={{ width: "120px" }}
                    type="text" // changed from number to text
                    value={
                      item.gstDetails?.taxAmount
                        ? Number(item.gstDetails.taxAmount)
                        : "₹0.00"
                    }
                  />
                </Td>

                {taxMode === "inclusive" ? (
                  <Td>
                    {item.quantityRate
                      ? Number(item.quantityRate).toFixed(2)
                      : "₹0.00"}
                  </Td>
                ) : (
                  <Td>
                      {/* {item.quantityRate
                      ? Number(item.quantityRate).toFixed(2)
                      : "₹0.00"} */}
                    {grossTotal + (Number(item.gstDetails?.taxAmount) || 0)}
                  </Td>
                )}
                <Td>
                  <DeleteIcon
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <FiTrash2 />
                  </DeleteIcon>
                </Td>
              </tr>
            );
          })}
          <tr style={{ height: "75px" }}>
            <Td colSpan={8}>
              <AddItemButton type="button" onClick={handleAddItem}>
                + Add Item/Service
              </AddItemButton>
            </Td>
          </tr>
        </TBody>
      </Table>

      <AddServiceFieldModal
        Show={ShowCreateCdModal}
        handleCloseModal={() => setShowCreateCdModal(false)}
      />
    </TableWrapper>
  );
};

export default ItemDetailsTable;
