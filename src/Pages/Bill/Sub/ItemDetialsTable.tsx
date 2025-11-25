// ServiceTable.tsx
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
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

interface ServiceItem {
  service: string;
  quantity: number | string;
  quantityRate: number | string;
  extraCharge: number | string;
  discount: number | string;
}

interface FormValues {
  items: ServiceItem[];
}

const services = ["Stitching", "Dry Cleaning", "Ironing"];

const ItemDetialsTable: React.FC = () => {
  const { register, control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      items: [
        {
          service: "Stitching",
          quantity: 10,
          quantityRate: 4355,
          extraCharge: 4355,
          discount: 4355,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);
  };

  const watchItems = watch("items");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
      <TableWrapper>
        <Table>
          <Thead>
            <tr>
              <Th></Th>
              <Th>Service</Th>
              <Th>Quantity</Th>
              <Th>Quantity Rate</Th>

              <Th>Discount</Th>
              <Th>Gross total</Th>
              <Th></Th>
            </tr>
          </Thead>
          <TBody>
            {fields.map((item, index) => {
              const qty = Number(watchItems?.[index]?.quantity || 0);
              const rate = Number(watchItems?.[index]?.quantityRate || 0);
              const extra = Number(watchItems?.[index]?.extraCharge || 0);
              const discount = Number(watchItems?.[index]?.discount || 0);
              const grossTotal = qty * rate + extra - discount;

              return (
                <tr key={item.id}>
                  <Td>
                    <input type="checkbox" />
                  </Td>
                  <Td>
                    <StyledSelectWrapper
                      style={{ width: "120px",  }}
                    >
                      <StyledSelect
                        value=""
                        style={{ width: "120px",height: "38px"}}
                        {...register(`items.${index}.service` as const)}
                      >
                        <option value="">Select</option>
                        {services.map((srv) => (
                          <option key={srv} value={srv}>
                            {srv}
                          </option>
                        ))}
                      </StyledSelect>
                      <DownArrowIcon />
                    </StyledSelectWrapper>
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      {...register(`items.${index}.quantity` as const)}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      {...register(`items.${index}.quantityRate` as const)}
                    />
                  </Td>

                  <Td>
                    <Input
                      type="number"
                      {...register(`items.${index}.discount` as const)}
                    />
                  </Td>
                  <Td>
                    {grossTotal.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </Td>
                  <Td>
                    <DeleteIcon type="button" onClick={() => remove(index)}>
                      <FiTrash2 />
                    </DeleteIcon>
                  </Td>
                </tr>
              );
            })}
            <tr>
              <Td colSpan={8}>
                <AddItemButton
                  type="button"
                  onClick={() =>
                    append({
                      service: "",
                      quantity: "",
                      quantityRate: "",
                      extraCharge: "",
                      discount: "",
                    })
                  }
                >
                  + Add Item
                </AddItemButton>
              </Td>
            </tr>
          </TBody>
        </Table>
      </TableWrapper>
    </form>
  );
};

export default ItemDetialsTable;
