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
  StyledTableImg,
} from "../../../../Styles/TableStyles";
import ActionDropdown from "../../../../Components/Dropdowns/Action Dropdown/ActionDropdown";
import AddServiceFieldModal from "./AddServiceFieldModal";
import PaginationComponent from "../../../../Components/Paginations/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteServiceField,
  GetServiceField,
} from "../../../../Redux/Api/Settings/action";
import { GetSession } from "../../../../Lib/Session";
import ConfirmationModal from "../../../../Components/Modals/ConfirmationModal";

function ServiceField() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SessionData = GetSession();

  const [ShowCreateCdModal, setShowCreateCdModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [selectedSections, setSelectedSections] = useState("");
  const [editData, setEditData] = useState<FormData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const ServiceFieldResponse: any = useSelector(
    (state: any) => state.SettingReducers.GetServiceFieldRes
  );
  const AddServiceFieldResponse: any = useSelector(
    (state: any) => state.SettingReducers.AddServiceFieldRes
  );
  const EditServiceFieldResponse: any = useSelector(
    (state: any) => state.SettingReducers.EditServiceFieldRes
  );
  const DeleteServiceFieldResponse: any = useSelector(
    (state: any) => state.SettingReducers.DeleteServiceFieldRes
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
    { name: "Service ID" },
    { name: "SERVICE NAME " },
    { name: "SAC" },
    { name: "COST" },
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
        ServiceFieldResponse?.content?.map((item: any) => item.serviceId)
      );
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
      DeleteServiceField({
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
    if (SessionData) {
      dispatch(
        GetServiceField({
          org_id: SessionData?.user?.organizationId,
          branchId: SessionData?.user?.branchId,
          page: currentPage,
          searchText: searchTerm,
          size: perPage,
        }) as any
      );
    }
  }, [
    AddServiceFieldResponse,
    EditServiceFieldResponse,
    DeleteServiceFieldResponse,
    currentPage,
    searchTerm,
    perPage,
  ]);
  useEffect(() => {
    console.log("ServiceFieldResponse", ServiceFieldResponse);
  }, [ServiceFieldResponse]);

  return (
    <div className="w-100 flex-grow-1">
      <div className="d-flex justify-content-between mt-3 align-items-center">
        <ContentHeading>Services</ContentHeading>
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
                {ServiceFieldResponse?.content?.map(
                  (item: any, index: number) => (
                    <tr key={index}>
                      {/* <StickyTd>
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          checked={selectedItems.includes(item.serviceId)}
                          onChange={() => handleCheckboxChange(item.serviceId)}
                        />
                      </StickyTd> */}

                      <td>{item.serviceId}</td>
                      <td>
                        <div>
                          {/* {item.imagePath && (
                            <StyledTableImg
                              src={item.imagePath}
                              alt=""
                              className="me-2"
                            />
                          )} */}
                          {item.serviceName}
                        </div>
                      </td>
                      <td>{item.sac}</td>
                      <td>{item.cost}</td>
                      <td></td>
                      <td style={{ textAlign: "end" }}>
                        <ActionDropdown
                          onEdit={() => handleEdit(item)}
                          onDelete={() => handleDeleteClick(item.serviceId)}
                        />
                      </td>
                    </tr>
                  )
                )}
              </StyledMDBTableBody>
            </StyledMDBTable>

            <PaginationComponent
              perPage={perPage}
              totalPages={ServiceFieldResponse?.totalPages}
              totalElements={ServiceFieldResponse?.totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              handlePerPageChange={handlePerPageChange}
            />
          </FullTableContain>
        </StyledTable>
      </div>
      <AddServiceFieldModal
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

export default ServiceField;
