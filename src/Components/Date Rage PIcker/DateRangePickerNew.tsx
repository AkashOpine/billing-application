import React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Icon } from "@iconify/react/dist/iconify.js";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

const CalendarContainer = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #e1e3ea;
  z-index: 10;
  .react-datepicker__input-container input {
    border: none;
    width: 85px;
    color: #000;
    font-family: "Inter", sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 14px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    cursor: pointer;
    outline: none;
    margin-right: 8px;
  }

  .icon-div {
    margin-top: -2px;
    width: 20px;
    height: 20px;
  }
`;

const DateRangePickerNew: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const today = new Date();

  return (
    <CalendarContainer>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        selectsStart
        startDate={startDate ?? undefined}
        endDate={endDate ?? undefined}
        dateFormat="d MMM yyyy"
        placeholderText="Start Date"
        maxDate={today}
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date | null) => setEndDate(date)}
        selectsEnd
        startDate={startDate ?? undefined}
        endDate={endDate ?? undefined}
        minDate={startDate ?? undefined}
        maxDate={today}
        dateFormat="d MMM yyyy"
        placeholderText="End Date"
      />
      <div className="icon-div">
        <Icon
          icon="lets-icons:date-today-duotone"
          color="#464646"
          width="23"
          height="23"
        />
      </div>
    </CalendarContainer>
  );
};

export default DateRangePickerNew;
