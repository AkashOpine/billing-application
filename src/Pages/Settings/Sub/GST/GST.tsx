import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentHeading from "../../../../Components/Headings/ContentHeading";
import TableSearch from "../../../../Components/Inputs/Table Search/TableSearchInput";
import FilterDropdown from "../../../../Components/Dropdowns/Filter Dropdown/FilterDropdown";
import IconButton from "../../../../Components/Buttons/Icon Button/IconButton";
import { GoPlus } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  CustomMDBTableHead,
  FullTableContain,
  StickyTd,
  StickyTh,
  StyledMDBTable,
  StyledMDBTableBody,
  StyledTable,
} from "../../../../Styles/TableStyles";
import ActionDropdown from "../../../../Components/Dropdowns/Action Dropdown/ActionDropdown";
import AddGSTModal from "./AddGSTModal";
import PaginationComponent from "../../../../Components/Paginations/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { GetSession } from "../../../../Lib/Session";
import { DeleteGst, GetGst } from "../../../../Redux/Api/Settings/action";
import ConfirmationModal from "../../../../Components/Modals/ConfirmationModal";

function GST() {
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

  const GstResponse: any = useSelector(
    (state: any) => state.SettingReducers.GetGstRes
  );
  const AddGstResponse: any = useSelector(
    (state: any) => state.SettingReducers.AddGstRes
  );
  const EditGstResponse: any = useSelector(
    (state: any) => state.SettingReducers.EditGstRes
  );
  const DeleteGstResponse: any = useSelector(
    (state: any) => state.SettingReducers.DeleteGstRes
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
    { name: "Gst Type " },
    { name: "Percentage" },
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
      setSelectedItems(GstResponse?.content?.map((item: any) => item.gstId));
    }
    setIsSelectAllChecked(!isSelectAllChecked);
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
      DeleteGst({
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
      GetGst({
        org_id: SessionData?.user?.organizationId,
        branchId: SessionData?.user?.branchId,
        page: currentPage,
        searchText: searchTerm,
        size: perPage,
      }) as any
    );
  }, [
    AddGstResponse,
    EditGstResponse,
    DeleteGstResponse,
    searchTerm,
    currentPage,
    perPage,
  ]);
  useEffect(() => {
    console.log("GstResponse", GstResponse);
  }, [GstResponse]);
  return (
    <div className="w-100 flex-grow-1">
      <div className="d-flex justify-content-between mt-3 align-items-center">
        <ContentHeading>Gst</ContentHeading>
        <div className="d-flex gap-3">
          {/* <TableSearch value={searchTerm} onChange={handleSearch} /> */}
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
                  {/* <StickyTh>
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={isSelectAllChecked}
                      onChange={handleSelectAll}
                    />
                  </StickyTh> */}
                  {columnDef?.map((col, colIndex) => (
                    <th key={colIndex}>{col.name}</th>
                  ))}
                  <th></th>
                </tr>
              </CustomMDBTableHead>
              <StyledMDBTableBody>
                {GstResponse?.content ?.map((item: any, index: any) => (
                  <tr key={index}>
                    {/* <StickyTd>
                      <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={selectedItems.includes(item.gstId)}
                        onChange={() => handleCheckboxChange(item.gstId)}
                      />
                    </StickyTd> */}

                    <td>{item.gstType}</td>
                    <td>{item.percentage}</td>
                    <td></td>
                    <td style={{ textAlign: "end" }}>
                      <ActionDropdown
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDeleteClick(item.gstId)}
                      />
                    </td>
                  </tr>
                ))}
              </StyledMDBTableBody>
            </StyledMDBTable>
            <PaginationComponent
              perPage={perPage}
              totalPages={GstResponse?.totalPages}
              totalElements={GstResponse?.totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              handlePerPageChange={handlePerPageChange}
            />
          </FullTableContain>
        </StyledTable>
      </div>
      <AddGSTModal
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

export default GST;
