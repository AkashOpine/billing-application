import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetSession } from "../../../Lib/Session";
import ConfirmationModal from "../../../Components/Modals/ConfirmationModal";
import ContentHeading from "../../../Components/Headings/ContentHeading";
import TableSearch from "../../../Components/Inputs/Table Search/TableSearchInput";
import IconButton from "../../../Components/Buttons/Icon Button/IconButton";
import { GoPlus } from "react-icons/go";
import {
  CustomMDBTableHead,
  FullTableContain,
  StyledMDBTable,
  StyledMDBTableBody,
  StyledTable,
} from "../../../Styles/TableStyles";
import ActionDropdown from "../../../Components/Dropdowns/Action Dropdown/ActionDropdown";
import PaginationComponent from "../../../Components/Paginations/Pagination";
import AddVendorModal from "./AddVendorModal";
import { ClearPurchaseByVendor, DeleteVendor, GetVendor } from "../../../Redux/Api/Vendor/action";

function VendorList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SessionData = GetSession();
  const [addVendorModal, setAddVendorModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [editData, setEditData] = useState<FormData | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const VendorResponse: any = useSelector(
    (state: any) => state.VendorReducers.GetVendorRes
  );
  const AddVendorResponse: any = useSelector(
    (state: any) => state.VendorReducers.AddVendorRes
  );
  const EditVendorResponse: any = useSelector(
    (state: any) => state.VendorReducers.EditVendorRes
  );
  const DeleteVendorResponse: any = useSelector(
    (state: any) => state.VendorReducers.DeleteVendorRes
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
    { name: "Vendor Id" },
    { name: "Name" },
    { name: "Phone" },
    { name: "Email" },
    { name: "Gst No" },
    { name: "" },
  ];

  const handleRowClick = (id: number) => {
    dispatch(ClearPurchaseByVendor())
    //  dispatch(ClearCustById())
    navigate(`view/${id}`);
  };
  const handleEdit = (rowData: any) => {
    setEditData(rowData);
    handleOpenAddVendorModal();
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
      DeleteVendor({
        id: selectedId,
        userId: SessionData?.user?.id,
      }) as any
    );
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  const handleOpenAddVendorModal = () => {
    setAddVendorModal(true);
  };
  const handleCloseAddVendorModal = () => {
    setAddVendorModal(false);
  };

  useEffect(() => {
    dispatch(
      GetVendor({
        org_id: SessionData?.user?.organizationId,
        branchId: SessionData?.user?.branchId,
        page: currentPage,
        searchText: searchTerm,
        size: perPage,
      }) as any
    );
  }, [
    AddVendorResponse,
    EditVendorResponse,
    DeleteVendorResponse,
    searchTerm,
    currentPage,
    perPage,
  ]);

  useEffect(() => {
    console.log("VendorResponse", VendorResponse);
  }, [VendorResponse]);

  return (
    <div className="w-100 flex-grow-1">
      <div className="d-flex justify-content-between mt-3 align-items-center">
        <ContentHeading>Vendor</ContentHeading>
        <div className="d-flex gap-3">
          <TableSearch value={searchTerm} onChange={handleSearch} />
          <IconButton
            icon={GoPlus}
            bg="#0539f4"
            onClick={handleOpenAddVendorModal}
          >
            New
          </IconButton>
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
                {VendorResponse?.content?.map((item: any, index: any) => (
                  <tr key={index} onClick={() => handleRowClick(item.vendorId)}>
                    <td>{item.vendorNumber}</td>
                    <td>{item.vendorName}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.gstNumber}</td>
                    <td></td>
                    <td style={{ textAlign: "end" }}>
                      <ActionDropdown
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDeleteClick(item.vendorId)}
                      />
                    </td>
                  </tr>
                ))}
              </StyledMDBTableBody>
            </StyledMDBTable>

            <PaginationComponent
              perPage={perPage}
              totalPages={VendorResponse?.totalPages}
              totalElements={VendorResponse?.totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              handlePerPageChange={handlePerPageChange}
            />
          </FullTableContain>
        </StyledTable>
      </div>
      <AddVendorModal
        Show={addVendorModal}
        handleCloseModal={handleCloseAddVendorModal}
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

export default VendorList;
