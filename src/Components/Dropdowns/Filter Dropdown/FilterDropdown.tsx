import React, { useState } from "react";
import { Accordion, Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import { IoFilterOutline } from "react-icons/io5";
import IconButton from "../../Buttons/Icon Button/IconButton";
import SearchCustomInput from "../../Inputs/SearchInput/SearchCustomInput";
import { MainHeading } from "../../../Styles/CommonStyles";
import DateRangePicker from "../../Date Rage PIcker/DateRangePicker";
interface FilterItem {
  id: string;
  label: string;
  checked?: boolean;
}

interface FilterSection {
  heading: string;
  data?: FilterItem[] | string[];
  selectedData?: string;
  setSelectedData?: (selected: string) => void;
  resetSelectedData?: () => void; // Optional reset logic
}

interface FilterDropdownProps {
  sections?: FilterSection[];
  fromDate?: string;
  toDate?: string;
  onFromDateChange?: (date: string) => void;
  onToDateChange?: (date: string) => void;
}
const today = new Date();
const fifteenDaysAgo = new Date();
fifteenDaysAgo.setDate(today.getDate() - 15);
const formatDate = (date: Date): string => date.toISOString().split("T")[0];
const FilterDropdown: React.FC<FilterDropdownProps> = ({
  sections,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}) => {
  const [show, setShow] = useState(false);
  const [showAllStates, setShowAllStates] = useState<Record<string, boolean>>(
    {}
  );

  const toggleShowAll = (heading: string) => {
    setShowAllStates((prev) => ({
      ...prev,
      [heading]: !prev[heading],
    }));
  };

  const clearAllFilters = () => {
    sections?.forEach((section) => {
      if (section.setSelectedData) {
        section.setSelectedData(""); // Reset to default
      }
      if (section.resetSelectedData) {
        section.resetSelectedData(); // Custom logic if provided
      }
    });

    if (onFromDateChange) onFromDateChange(formatDate(fifteenDaysAgo));
    if (onToDateChange) onToDateChange(formatDate(today));
  };

  return (
    <Dropdown
      align="end"
      show={show}
      onToggle={(nextShow) => setShow(nextShow)}
    >
      <CustomToggle>
        <IconButton icon={IoFilterOutline} iconColor="#FF9F0E" iconSize="14">
          Filter
        </IconButton>
      </CustomToggle>

      <TableDropdown show={show}>
        <DropdownHeader className="py-3 px-4">
          <MainHeading>Filters</MainHeading>
          <div className="d-flex gap-3">
            <Button variant="link" size="sm" onClick={clearAllFilters}>
              Clear
            </Button>

            <IoFilterOutline size={22} color="#FF9F0E" />
          </div>
        </DropdownHeader>

        {/* Clear All Button */}

        {/* Date Range Picker */}
        {fromDate !== undefined &&
          toDate !== undefined &&
          onFromDateChange &&
          onToDateChange && (
            <div className="px-4 pb-3 mt-3">
              <DateRangePicker
                fromDate={fromDate}
                toDate={toDate}
                onFromDateChange={onFromDateChange}
                onToDateChange={onToDateChange}
              />
            </div>
          )}

        {/* Filter Sections */}
        {sections?.map((section, sectionIndex) => {
          const normalizedData =
            Array.isArray(section.data) && section.data.length > 0
              ? section.data.map((item) =>
                  typeof item === "string"
                    ? { id: item, label: item }
                    : { id: String(item.id), label: String(item.label) }
                )
              : [];

          const showAll = showAllStates[section.heading] || false;
          const visibleData = showAll
            ? normalizedData
            : normalizedData.slice(0, 6);

          return (
            <Accordion
              defaultActiveKey={sectionIndex.toString()}
              key={section.heading}
              className={sectionIndex > 0 ? "mt-4" : ""}
            >
              <Accordion.Item eventKey={sectionIndex.toString()}>
                <AccordionHeader>{section.heading}</AccordionHeader>
                <AccordionBody>
                  <Row>
                    <Col>
                      <SearchCustomInput
                        placeholder={`Search ${section.heading}`}
                      />
                    </Col>
                  </Row>

                  <Form.Group className="mt-3">
                    <Row xs={2}>
                      {visibleData.map((item) => (
                        <Col key={item.id} className="mb-3">
                          <Form.Check
                            type="checkbox"
                            id={item.id}
                            label={item.label}
                            checked={section.selectedData === item.label}
                            onChange={() => {
                              if (section.setSelectedData) {
                                section.setSelectedData(
                                  section.selectedData === item.label
                                    ? ""
                                    : item.label
                                );
                              }
                            }}
                          />
                        </Col>
                      ))}
                    </Row>

                    {normalizedData.length > 6 && (
                      <ViewAll onClick={() => toggleShowAll(section.heading)}>
                        {showAll ? "View Less" : "View All.."}
                      </ViewAll>
                    )}
                  </Form.Group>
                </AccordionBody>
              </Accordion.Item>
            </Accordion>
          );
        })}
      </TableDropdown>
    </Dropdown>
  );
};
// Styled components
const TableDropdown = styled(Dropdown.Menu)`
  width: 400px;
  max-height: 500px;
  overflow: auto;
  border-radius: 6px;
  box-shadow: -3px 4px 23px 0px #0000001f;
  padding: 0px;
  border: 0.5px solid #b0b0b0;
`;

const AccordionBody = styled(Accordion.Body)`
  background-color: #f9f9f9;
`;

const AccordionHeader = styled(Accordion.Header)`
  button {
    font-size: 18px;
    font-weight: 500;
    line-height: 21.09px;
  }
`;

const FormGroup = styled(Form.Group)`
  padding: 10px 0px;
`;

const ViewAll = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 18.75px;
  color: #0539f4;
  cursor: pointer;
  text-align: left;
`;
export const CustomToggle = styled(Dropdown.Toggle)`
  &.dropdown-toggle {
    background: none;
    border: none;
    padding: 0;
    box-shadow: none;

    &:after {
      display: none; /* Removes the default caret */
    }
  }
`;

export const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #0000001a;
  svg {
    cursor: pointer;
  }
`;
export default FilterDropdown;
