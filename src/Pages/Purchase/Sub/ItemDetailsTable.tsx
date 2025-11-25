import React from "react";
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
import { Input } from "../../../Styles/Form Styles/FormStyles";
import { FiTrash2 } from "react-icons/fi";

interface ItemRow {
  itemName: string;
  quantity: number | "";
  rate: number | "";
  amount: number | "";
  manualAmount: boolean;
}

interface Props {
  items: ItemRow[];
  onRowChange: (index: number, updatedRow: ItemRow) => void;
  onAddRow: () => void;
  onDeleteRow: (index: number) => void;
}

const ItemDetailsTable: React.FC<Props> = ({
  items,
  onRowChange,
  onAddRow,
  onDeleteRow,
}) => {
  const handleChange = (index: number, field: keyof ItemRow, value: string) => {
    const updatedRow = { ...items[index] };

    if (field === "quantity" || field === "rate") {
      const numValue = value === "" ? "" : Number(value);
      updatedRow[field] = numValue as never;
      if (!updatedRow.manualAmount) {
        const qty = Number(updatedRow.quantity || 0);
        const rate = Number(updatedRow.rate || 0);
        updatedRow.amount = Number((qty * rate).toFixed(2));
      }
    } else if (field === "amount") {
      updatedRow.amount = value === "" ? "" : Number(value);
      updatedRow.manualAmount = true;
    } else {
      updatedRow[field] = value as never; // 👈 force type for string field
    }

    onRowChange(index, updatedRow);
  };
  return (
    <TableWrapper>
      <Table>
        <Thead>
          <tr>
            <Th>Item Name</Th>
            <Th>Quantity</Th>
            <Th>Rate</Th>
            <Th>Amount</Th>
            <Th></Th>
          </tr>
        </Thead>
        <TBody>
          {items.map((item, index) => (
            <tr key={index}>
              <Td>
                <Input
                  type="text"
                  value={item.itemName}
                  onChange={(e) =>
                    handleChange(index, "itemName", e.target.value)
                  }
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleChange(index, "quantity", e.target.value)
                  }
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  min="0"
                  value={item.rate}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (value >= 0 || e.target.value === "") {
                      handleChange(index, "rate", e.target.value);
                    }
                  }}
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={item.amount}
                  onChange={(e) =>
                    handleChange(index, "amount", e.target.value)
                  }
                />
              </Td>
              <Td>
                <DeleteIcon type="button" onClick={() => onDeleteRow(index)}>
                  <FiTrash2 />
                </DeleteIcon>
              </Td>
            </tr>
          ))}
          <tr style={{ height: "75px" }}>
            <Td colSpan={5}>
              <AddItemButton type="button" onClick={onAddRow}>
                + Add
              </AddItemButton>
            </Td>
          </tr>
        </TBody>
      </Table>
    </TableWrapper>
  );
};
export default ItemDetailsTable;
