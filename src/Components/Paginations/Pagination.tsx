import React, { useState, useEffect } from "react";
import { Pagination as MuiPagination } from "@mui/material";
import styled from "styled-components";
// Define types for component props
interface PaginationComponentProps {
  totalPages: number;
  totalElements?: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  handlePerPageChange: (perPage: number) => void;
  totalLabel?: boolean;
  siblingCount?: number;
  perPage?:number;
}

// PaginationComponent with types
const PaginationComponent: React.FC<PaginationComponentProps> = ({
  perPage=10,
  totalPages,
  totalElements = 0,
  currentPage,
  handlePageChange,
  handlePerPageChange,
  totalLabel = true,
  siblingCount = 1,
}) => {
  const perPageOptions = [10, 20, 30, 40];

  const handlePerPageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value === "all" 
      ? totalElements 
      : parseInt(e.target.value, 10);
    handlePerPageChange(selectedValue);
  };

  return (
    <PaginationContainer>
      {totalLabel && (
        <PerPageContainer>
          <CustomSelect 
            value={perPage === totalElements ? "all" : perPage} 
            onChange={handlePerPageSelect}
          >
            {perPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            <option key="all" value="all">
              View All
            </option>
          </CustomSelect>
        </PerPageContainer>
      )}
      {totalPages > 1 && (
        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={(_event : any, page : number) => handlePageChange(page)}
          size="small"
          siblingCount={siblingCount}
        sx={{
        '& .MuiPaginationItem-root': {
          color: '#5B5B5B',
        },
        '& .Mui-selected': {
          backgroundColor: '#000000 !important',
          color: '#FFFFFF !important',
          '&:hover': {
            backgroundColor: '#000000 !important',
          }
        }
      }}
        />
      )}
    </PaginationContainer>
  );
};

// Styled components with types
const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PerPageContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const CustomSelect = styled.select`
  border: none;
  border-radius: 6px;
  padding: 0rem 0.2rem;
  width: 80px;  /* Increased width to accommodate "View All" option */
  height: 30px;
  color: #a1a5b7;
  background: #f9f9f9;
  font-weight: 600;
  font-size: 12px;
  line-height: 10px;
  letter-spacing: -3%;

  &:focus {
    outline: none;
    border-color: #215073;
  }
`;

export default PaginationComponent;