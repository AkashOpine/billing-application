import React, { useRef } from "react";
import styled from "styled-components";
import { IoCalendarOutline } from "react-icons/io5";

interface DateRangePickerProps {
  fromDate: string;
  toDate: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}) => {
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().split("T")[0];

  return (
    <DateWrapper>
      <DateField onClick={() => fromRef.current?.showPicker()}>
        <Placeholder>{fromDate || "From"}</Placeholder>
        <HiddenInput
          ref={fromRef}
          type="date"
          value={fromDate}
          onChange={(e) => onFromDateChange(e.target.value)}
          max={toDate || today} // From date can't be after To date or today
        />
        <IoCalendarOutline className="calendar-icon" />
      </DateField>

      <DateField onClick={() => toRef.current?.showPicker()}>
        <Placeholder>{toDate || "To"}</Placeholder>
        <HiddenInput
          ref={toRef}
          type="date"
          value={toDate}
          onChange={(e) => onToDateChange(e.target.value)}
          min={fromDate || undefined} // To date must be after From date
          max={today} // To date cannot be in the future
        />
        <IoCalendarOutline className="calendar-icon" />
      </DateField>
    </DateWrapper>
  );
};

export const DateWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const DateField = styled.div`
  position: relative;
  width: 150px;
  height: 35px;
  background: #fff;
  border: 0.5px solid #d6d6d6;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  cursor: pointer;

  .calendar-icon {
    color: #999;
    font-size: 1.2rem;
    margin-left: auto;
  }
`;

export const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const Placeholder = styled.span`
  font-size: 1rem;
  color: #999;
`;
export default DateRangePicker;
