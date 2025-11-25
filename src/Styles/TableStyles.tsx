import styled from "styled-components";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { Nav, Tabs } from "react-bootstrap";
interface StatusBoxProps {
  status: string;
}
export const StyledTable = styled.div<{ padding?: string; bg?: string }>`
  display: flex;
  padding: ${(props) => props.padding};
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: ${(props) => props.bg};
  .custom-checkbox {
    width: 15px;
    height: 15px;
  }
`;

export const StyledMDBTableBody = styled(MDBTableBody)`
  tr:hover td {
    background-color: #fef5ff;
  }
  td {
    font-size: 15px;
    padding: 15px 10px;
    padding-left: 14px;
    white-space: nowrap;
    vertical-align: middle;
    background: #ffffff10;
  }
`;

export const StyledMDBTable = styled(MDBTable)`
  border: 1px solid #f0f0f0;
  background-color: #ffffff80;
  border-radius: 6px;
`;

export const CustomMDBTableHead = styled(MDBTableHead)`
  th {
    border: 0px solid #ffffff;
    background: #e8ecff;
    font-family: "Roboto";
    font-size: 16px;
    font-weight: 400; /* Apply font weight 500 only to th */
    line-height: 19px;
    text-align: left;
    color: #9a9a9a;
    padding: 15px 5px;
    padding-left: 14px;
    padding-right: 14px;
    white-space: nowrap;
    vertical-align: middle;
  }

  td {
    border-bottom: 1px solid #e5e5e5;
    background: #f2f5fb;
    font-family: "Roboto";
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: left;
    color: #5b5b5b;
    padding: 15px 10px;
    padding-right: 14px;
    vertical-align: middle;
  }
`;

export const FullTableContain = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 6px;
  border: 1px solid #f0f0f0;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const StickyTh = styled.th`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
`;
export const StickyTd = styled.td`
  position: sticky;
  left: 0;
  z-index: 2;
`;
export const StyledTableNav = styled(Nav)`
  background: #ffffff4d;
  border-radius: 4px;
  border: 0.5px solid #0539f4;
  padding: 3px;
  width: fit-content;
  flex-wrap: nowrap;
  gap: 1rem;
`;

// Styled Nav.Item
export const StyledTableNavItem = styled(Nav.Item)``;

// Styled Nav.Link
export const StyledTableNavLink = styled(Nav.Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: fit-content;
  white-space: nowrap;
  padding: 10px 25px;
  border-radius: 4px;
  background: transparent;
  color: #4e4e4e;
  font-size: 14px;
  line-height: 16.45px;

  &:hover {
    font-weight: 500;
    color: #000000;
  }

  &.active {
    color: #000000;
    font-weight: 500;
    background: #00e7cb38;
  }
`;
export const PaymentStatusCell = styled.td<{ paymentStatus: string }>`
  font-weight: 500;
  color: ${({ paymentStatus }) =>
    paymentStatus === "Paid"
      ? "#2dd4bf"
      : paymentStatus === "Pending"
      ? "#fb923c"
      : paymentStatus === "Due"
      ? "#3b82f6"
      : "#000"};
`;
export const StatusBox = styled.div<StatusBoxProps>`
  font-weight: 500;
  border-radius: 10px;
  padding: 6px 10px;
  text-align: center;
  background-color: ${({ status }) =>
    status === "Payment Complete" || status === "Paid"
      ? "#e6f7ff" // new light blue for Paid
      : status === "Pending"
      ? "#fff7ed"
      : status === "Partial"
      ? "#f0f4ff" // new very light lavender for Partial
      : "#ffffff"};

  color: ${({ status }) =>
    status === "Payment Complete" || status === "Paid"
      ? "#007acc" // new strong blue for Paid
      : status === "Pending"
      ? "#fb923c"
      : status === "Partial"
      ? "#6b5b95" // new deep lavender for Partial
      : "#000"};
`;

export const BalanceDue = styled.td`
  color: #d946ef;
  font-weight: 500;
`;
export const StyledTableImg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;
export const PayButton = styled.button`
  color: #fff;
  padding: 4px 20px;
  border: none;
  background: #0539f4;
  border-radius: 2px;
`;
