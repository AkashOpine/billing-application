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
  StatusBox,
  StyledMDBTable,
  StyledMDBTableBody,
  StyledTable,
} from "../../../Styles/TableStyles";
import ActionDropdown from "../../../Components/Dropdowns/Action Dropdown/ActionDropdown";
import PaginationComponent from "../../../Components/Paginations/Pagination";
import {
  ClearAddPurchase,
  DeletePurchase,
  GetPurchase,
} from "../../../Redux/Api/Purchase/action";

function PurchaseList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SessionData = GetSession();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const PurchaseResponse: any = useSelector(
    (state: any) => state.PurchaseReducers.GetPurchaseRes
  );
  const AddPurchaseResponse: any = useSelector(
    (state: any) => state.PurchaseReducers.AddPurchaseRes
  );
  const EditPurchaseResponse: any = useSelector(
    (state: any) => state.PurchaseReducers.EditPurchaseRes
  );
  const DeletePurchaseResponse: any = useSelector(
    (state: any) => state.PurchaseReducers.DeletePurchaseRes
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
    { name: "Purchase Number" },
    { name: "Invoice Number" },
    { name: "Name" },
    { name: "Phone" },
    { name: "Grand total " },
    { name: "Received" },
    { name: "Balance Due" },
    { name: "Payment status " },

    { name: "" },
  ];

  const handleEdit = (id: any) => {
    dispatch(ClearAddPurchase());
    navigate(`add/${id}`);
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
      DeletePurchase({
        id: selectedId,
        userId: SessionData?.user?.id,
      }) as any
    );
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  const AddPurchase = () => {
    dispatch(ClearAddPurchase());
    navigate("add");
  };

  useEffect(() => {
    dispatch(
      GetPurchase({
        org_id: SessionData?.user?.organizationId,
        branchId: SessionData?.user?.branchId,
        page: currentPage,
        searchText: searchTerm,
        size: perPage,
      }) as any
    );
  }, [
    AddPurchaseResponse,
    EditPurchaseResponse,
    DeletePurchaseResponse,
    searchTerm,
    currentPage,
    perPage,
  ]);
  useEffect(() => {
    console.log("PurchaseResponse", PurchaseResponse);
  }, [PurchaseResponse]);

  return (
    <div className="w-100 flex-grow-1">
      <div className="d-flex justify-content-between mt-3 align-items-center">
        <ContentHeading>Purchase</ContentHeading>
        <div className="d-flex gap-3">
          <TableSearch value={searchTerm} onChange={handleSearch} />
          {/* <FilterDropdown
            // sections={[
            //   {
            //     heading: "Section",
            //     data: [
            //       { id: "1", label: "Regular" },
            //       { id: "2", label: "Reference" },
            //     ],
            //     selectedData: selectedSections,
            //     setSelectedData: setSelectedSections,
            //   },
            // ]}
            fromDate={fromDate}
            toDate={toDate}
            onFromDateChange={setFromDate}
            onToDateChange={setToDate}
          /> */}
          <IconButton icon={GoPlus} bg="#0539f4" onClick={AddPurchase}>
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
                {PurchaseResponse?.content?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{item.poNumber}</td>
                    <td>{item.poInvoiceNumber}</td>
                    <td>{item.poVendorName}</td>
                    <td>{item.poVendorPhone}</td>

                    <td style={{ fontWeight: "600" }}>{item.poGrandTotal}</td>
                    <td style={{ fontWeight: "600" }}>{item.poPaidAmount}</td>
                    <td style={{ color: "#d946ef" }}>{item.poBalanceAmount}</td>
                    <td>
                      <StatusBox status={item.poPaidStatusDescription}>
                        {item.poPaidStatusDescription}
                      </StatusBox>
                    </td>

                    <td></td>
                    <td style={{ textAlign: "end" }}>
                      <ActionDropdown
                        onDelete={() => handleDeleteClick(item.poId)}
                        onEdit={() => handleEdit(item.poId)}
                      />
                    </td>
                  </tr>
                ))}
              </StyledMDBTableBody>
            </StyledMDBTable>

            <PaginationComponent
              perPage={perPage}
              totalPages={PurchaseResponse?.totalPages}
              totalElements={PurchaseResponse?.totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              handlePerPageChange={handlePerPageChange}
            />
          </FullTableContain>
        </StyledTable>
      </div>
      <ConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseModal}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}
export default PurchaseList;
