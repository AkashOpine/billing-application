import React from "react";
import styled from "styled-components";
import { FiCalendar } from "react-icons/fi";

interface DateRangeInputProps {
  fromDate?: string;
  toDate?: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
}

const DateRangeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DateInputWrapper = styled.div`
  position: relative;
  width: 180px;
`;

const DateInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 38px 0 12px;

  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;

  font-size: 14px;
  color: #374151;

  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }

  &::-webkit-calendar-picker-indicator {
    opacity: 0;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const CalendarIcon = styled(FiCalendar)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
`;

const Separator = styled.span`
  color: #6b7280;
  font-size: 14px;
`;

const DateRangeInput: React.FC<DateRangeInputProps> = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}) => {
  return (
    <DateRangeWrapper>
      <DateInputWrapper>
        <DateInput
          type="date"
          value={fromDate || ""}
          onChange={(e) => onFromDateChange(e.target.value)}
          placeholder="From Date"
        />
        <CalendarIcon size={17} />
      </DateInputWrapper>

      <Separator>to</Separator>

      <DateInputWrapper>
        <DateInput
          type="date"
          value={toDate || ""}
          onChange={(e) => onToDateChange(e.target.value)}
          placeholder="To Date"
        />
        <CalendarIcon size={17} />
      </DateInputWrapper>
    </DateRangeWrapper>
  );
};

export default DateRangeInput;