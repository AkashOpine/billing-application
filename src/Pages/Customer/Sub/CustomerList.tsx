import React, { useEffect, useState } from "react";
import IconButton from "../../../Components/Buttons/Icon Button/IconButton";
import { GoPlus } from "react-icons/go";
import ContentHeading from "../../../Components/Headings/ContentHeading";
import TableSearch from "../../../Components/Inputs/Table Search/TableSearchInput";
import FilterDropdown from "../../../Components/Dropdowns/Filter Dropdown/FilterDropdown";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  CustomMDBTableHead,
  FullTableContain,
  StickyTd,
  StickyTh,
  StyledMDBTable,
  StyledMDBTableBody,
  StyledTable,
} from "../../../Styles/TableStyles";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../../../Components/Paginations/Pagination";
import ActionDropdown from "../../../Components/Dropdowns/Action Dropdown/ActionDropdown";
import AddCustomerModal from "./AddCustomerModal";
import { GetSession } from "../../../Lib/Session";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearCustById,
  ClearInvoiceByCust,
  DeleteCustomer,
  GetCustomer,
} from "../../../Redux/Api/Customer/action";
import ConfirmationModal from "../../../Components/Modals/ConfirmationModal";

function CustomerList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SessionData = GetSession();
  const [ShowCreateCdModal, setShowCreateCdModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [selectedSections, setSelectedSections] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [editData, setEditData] = useState<FormData | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const CustomerResponse: any = useSelector(
    (state: any) => state.CustomerReducers.GetCustomerRes
  );
  const AddCustomerResponse: any = useSelector(
    (state: any) => state.CustomerReducers.AddCustomerRes
  );
  const EditCustomerResponse: any = useSelector(
    (state: any) => state.CustomerReducers.EditCustomerRes
  );
  const DeleteCustomerResponse: any = useSelector(
    (state: any) => state.CustomerReducers.DeleteCustomerRes
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log("searchTerm", searchTerm);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePerPageChange = (perPage: number) => {
    setPerPage(perPage);
    setCurrentPage(1);
  };
  const columnDef = [
    { name: "Customer Id" },
    { name: "Name" },
    { name: "Phone" },
    { name: "Email" },
    { name: "Gst No" },
      { name: "Address" },
    { name: "" },
  ];

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
      setSelectedItems(
        CustomerResponse?.content?.map((item: any) => item.customerId)
      );
    }
    setIsSelectAllChecked(!isSelectAllChecked);
  };
  const handleRowClick = (id: number) => {
    dispatch(ClearInvoiceByCust())
     dispatch(ClearCustById())
    navigate(`view/${id}`);
  };
  const handleEdit = (rowData: any) => {
    setEditData(rowData);
    handleOpenCreateCdModal();
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    dispatch(
      DeleteCustomer({
        id: selectedId,
        userId: SessionData?.user?.id,
      }) as any
    );
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  const handleOpenCreateCdModal = () => {
    setShowCreateCdModal(true);
  };
  const handleCloseCreateCdModal = () => {
    setShowCreateCdModal(false);
  };

  useEffect(() => {
    dispatch(
      GetCustomer({
        org_id: SessionData?.user?.organizationId,
        branchId: SessionData?.user?.branchId,
        page: currentPage,
        searchText: searchTerm,
        size: perPage,
      }) as any
    );
  }, [
    AddCustomerResponse,
    EditCustomerResponse,
    DeleteCustomerResponse,
    searchTerm,
    currentPage,
    perPage,
  ]);

  useEffect(() => {
    console.log("CustomerResponse", CustomerResponse);
  }, [CustomerResponse]);

  return (
    <div className="w-100 flex-grow-1">
      <div className="d-flex justify-content-between mt-3 align-items-center">
        <ContentHeading>Customer</ContentHeading>
        <div className="d-flex gap-3">
          <TableSearch value={searchTerm} onChange={handleSearch} />
          {/* <FilterDropdown
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
          /> */}
          <IconButton
            icon={GoPlus}
            bg="#0539f4"
            onClick={handleOpenCreateCdModal}
          >
            New
          </IconButton>
          {/* <IconButton icon={HiOutlineDotsVertical} iconColor="" padding="0.6em">
            Action
          </IconButton> */}
        </div>
      </div>
      <div className="mt-4">
        <StyledTable>
          <FullTableContain>
            <StyledMDBTable>
              <CustomMDBTableHead>
                <tr>
                 
                  {columnDef?.map((col, colIndex) => (
                    <th key={colIndex}>{col.name}</th>
                  ))}
                  <th></th>
                </tr>
              </CustomMDBTableHead>
              <StyledMDBTableBody>
                {CustomerResponse?.content?.map((item: any, index: any) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(item.customerId)}
                  >
                    

                    <td>{item.customerNumber}</td>
                    <td>{item.customerName}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.gstNumber}</td>
                    <td>{item.address}</td>
                    <td></td>
                    <td style={{ textAlign: "end" }}>
                      <ActionDropdown
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDeleteClick(item.customerId)}
                      />
                    </td>
                  </tr>
                ))}
              </StyledMDBTableBody>
            </StyledMDBTable>

            <PaginationComponent
              perPage={perPage}
              totalPages={CustomerResponse?.totalPages}
              totalElements={CustomerResponse?.totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              handlePerPageChange={handlePerPageChange}
            />
          </FullTableContain>
        </StyledTable>
      </div>
      <AddCustomerModal
        Show={ShowCreateCdModal}
        handleCloseModal={handleCloseCreateCdModal}
        EditData={editData}
        setEditData={setEditData}
      />
      <ConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseModal}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}

export default CustomerList;
