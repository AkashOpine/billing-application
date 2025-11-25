import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentHeading from "../../../Components/Headings/ContentHeading";
import TableSearch from "../../../Components/Inputs/Table Search/TableSearchInput";
import FilterDropdown from "../../../Components/Dropdowns/Filter Dropdown/FilterDropdown";
import { GoPlus } from "react-icons/go";
import IconButton from "../../../Components/Buttons/Icon Button/IconButton";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  BalanceDue,
  CustomMDBTableHead,
  FullTableContain,
  PaymentStatus,
  StickyTd,
  StickyTh,
  StyledMDBTable,
  StyledMDBTableBody,
  StyledTable,
} from "../../../Styles/TableStyles";
import ActionDropdown from "../../../Components/Dropdowns/Action Dropdown/ActionDropdown";
import PaginationComponent from "../../../Components/Paginations/Pagination";
import ColumnDropdown from "../../../Components/Dropdowns/Column Dropdown/ColumnDropdown";
const tableData = [
  {
    id: "558612",
    name: "Autumn Phillips",
    phone: "(978) 444-4055",
    deliveryDate: "24 May, 2020",
    services: "Churidar, Blouse",
    qty: "2+",
    grandTotal: "₹7,283",
    received: "₹7,283",
    balanceDue: "₹2323",
    paymentStatus: "Paid",
  },
  {
    id: "558613",
    name: "Kenneth Allen",
    phone: "(347) 438-7215",
    deliveryDate: "24 May, 2020",
    services: "Churidar, Blouse",
    qty: "2+",
    grandTotal: "₹7,283",
    received: "₹7,283",
    balanceDue: "₹2323",
    paymentStatus: "Paid",
  },
  {
    id: "558614",
    name: "Lorri Warf",
    phone: "(917) 339-6416",
    deliveryDate: "1 Feb, 2020",
    services: "Churidar, Blouse",
    qty: "2+",
    grandTotal: "₹7,283",
    received: "₹7,283",
    balanceDue: "₹2323",
    paymentStatus: "Pending",
  },
  {
    id: "558615",
    name: "Bradley Lawlor",
    phone: "(401) 715-3344",
    deliveryDate: "8 Sep, 2020",
    services: "Churidar, Blouse",
    qty: "2+",
    grandTotal: "₹7,283",
    received: "₹7,283",
    balanceDue: "₹2323",
    paymentStatus: "Pending",
  },
  {
    id: "558616",
    name: "Patricia Sanders",
    phone: "(920) 948-1722",
    deliveryDate: "17 Oct, 2020",
    services: "Churidar, Blouse",
    qty: "2+",
    grandTotal: "₹7,283",
    received: "₹7,283",
    balanceDue: "₹2323",
    paymentStatus: "Paid",
  },
  {
    id: "558617",
    name: "Kimberly Mastrangelo",
    phone: "(503) 338-2573",
    deliveryDate: "22 Oct, 2020",
    services: "Churidar, Blouse",
    qty: "2+",
    grandTotal: "₹7,283",
    received: "₹7,283",
    balanceDue: "₹2323",
    paymentStatus: "Pending",
  },
  {
    id: "558618",
    name: "Kurt Bates",
    phone: "(765) 322-1399",
    deliveryDate: "17 Oct, 2020",
    services: "Churidar, Blouse",
    qty: "2+",
    grandTotal: "₹7,283",
    received: "₹7,283",
    balanceDue: "₹2323",
    paymentStatus: "Paid",
  },
  {
    id: "558619",
    name: "David Elson",
    phone: "(813) 752-5611",
    deliveryDate: "8 Sep, 2020",
    services: "Churidar, Blouse",
    qty: "2+",
    grandTotal: "₹7,283",
    received: "₹7,283",
    balanceDue: "₹2323",
    paymentStatus: "Paid",
  },
  {
    id: "558620",
    name: "Alex Buckmaster",
    phone: "(303) 420-4261",
    deliveryDate: "1 Feb, 2020",
    services: "Churidar, Blouse",
    qty: "2+",
    grandTotal: "₹7,283",
    received: "₹7,283",
    balanceDue: "₹2323",
    paymentStatus: "Paid",
  },
  {
    id: "558621",
    name: "John Dukes",
    phone: "(602) 309-9604",
    deliveryDate: "24 May, 2020",
    services: "Churidar, Blouse",
    qty: "2+",
    grandTotal: "₹7,283",
    received: "₹7,283",
    balanceDue: "₹2323",
    paymentStatus: "Due",
  },
];
interface ColumnType {
  id: string;
  name: string;
  field: string;
  show: boolean;
  fixed: boolean;
}
function BillList() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [selectedSections, setSelectedSections] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePerPageChange = (perPage: number) => {
    setPerPage(perPage);
    setCurrentPage(1);
  };
  const [columnDef, setColumnDef] = useState<ColumnType[]>(
    [
      { name: "ID", field: "id", show: true, fixed: true },
      { name: "Name", field: "name", show: true, fixed: true },
      { name: "Phone", field: "phone", show: true, fixed: true },
      {
        name: "Expected Delivery date",
        field: "expectedDeliveryDate",
        show: true,
        fixed: true,
      },
      { name: "Services", field: "services", show: true, fixed: true },
      { name: "Grand total", field: "grandTotal", show: true, fixed: true },
      { name: "Received", field: "received", show: true, fixed: true },
      { name: "Balance Due", field: "balanceDue", show: true, fixed: true },
      {
        name: "Payment status",
        field: "paymentStatus",
        show: true,
        fixed: true,
      },
      { name: "", field: "actions", show: true, fixed: true },
    ].map((col, index) => ({ ...col, id: index.toString() }))
  );

  const handleCheckboxChange = (index: number) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
  };
  const handleSelectAll = () => {
    if (isSelectAllChecked) {
      setSelectedItems([]);
    } else {
      setSelectedItems(tableData.map((_, index) => index));
    }
    setIsSelectAllChecked(!isSelectAllChecked);
  };

  const handleEdit = (rowData: any) => {
    console.log("Edit clicked:", rowData);
  };

  const handleDelete = (rowData: any) => {
    console.log("Delete clicked:", rowData);
  };
  const AddBill = () => {
    navigate("add");
  };
  const AddBillNew = () => {
    navigate("add-new");
  };
  return (
    <div className="w-100 flex-grow-1">
      <div className="d-flex justify-content-between mt-3 align-items-center">
        <ContentHeading>Bill</ContentHeading>
        <div className="d-flex gap-3">
          <TableSearch />
          <ColumnDropdown Column={columnDef} setColumn={setColumnDef} />

          <FilterDropdown
            sections={[
              {
                heading: "Section",
                data: [
                  { id: "1", label: "Regular" },
                  { id: "2", label: "Reference" },
                ],
                selectedData: selectedSections,
                setSelectedData: setSelectedSections,
              },
            ]}
          />
          <IconButton icon={GoPlus} bg="#0539f4" onClick={AddBill}>
            New
          </IconButton>
          <IconButton icon={GoPlus} bg="#0539f4" onClick={AddBillNew}>
            Add Bill 2
          </IconButton>
          <IconButton icon={HiOutlineDotsVertical} iconColor="">
            Action
          </IconButton>
        </div>
      </div>
      <div className="mt-4">
        <StyledTable>
          <FullTableContain>
            <StyledMDBTable>
              <CustomMDBTableHead>
                <tr>
                  <StickyTh>
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={isSelectAllChecked}
                      onChange={handleSelectAll}
                    />
                  </StickyTh>
                    {columnDef
                    .filter((col) => col.show)
                    .map((col, index) => (
                      <th key={index}>{col.name}</th>
                    ))}
                    <th></th>
                </tr>
              </CustomMDBTableHead>
              <StyledMDBTableBody>
                {tableData.map((item, index) => (
                  <tr key={index} >
                    <StickyTd>
                      <input
                      className="custom-checkbox"
                        type="checkbox"
                        checked={selectedItems.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </StickyTd>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.deliveryDate}</td>
                    <td>
                      {item.services} {item.qty}
                    </td>
                    <td style={{ fontWeight: "600" }}>{item.grandTotal}</td>
                    <td style={{ fontWeight: "600" }}>{item.received}</td>
                    <td style={{ color: "#d946ef" }}>{item.balanceDue}</td>
                    <td style={{ textAlign: "center" }}>
                      <div
                        style={{
                          color:
                            item.paymentStatus === "Paid"
                              ? "#2dd4bf"
                              : item.paymentStatus === "Pending"
                              ? "#fb923c"
                              : item.paymentStatus === "Due"
                              ? "#3b82f6"
                              : "#000",
                           backgroundColor: "#fff",
                          padding: "2px 8px",
                          width:"max-content",
                          borderRadius: "5px",
                         
                          fontWeight: 500,
                          textAlign:"center"
                        }}

                      >
                        {item.paymentStatus}
                      </div>
                    </td>
                    <td></td>
                    <td style={{ textAlign: "end" }}>
                      <ActionDropdown
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDelete(item)}
                      />
                    </td>
                  </tr>
                ))}
              </StyledMDBTableBody>
            </StyledMDBTable>

            <PaginationComponent
              perPage={perPage}
              totalPages={12}
              totalElements={10}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              handlePerPageChange={handlePerPageChange}
            />
          </FullTableContain>
        </StyledTable>
      </div>
    </div>
  );
}

export default BillList;
