import { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import styled from "styled-components";
import { CiViewColumn } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { LuEqual } from "react-icons/lu";
import UnLocked from "../../../assets/lock.png";
import Locked from "../../../assets/lock-slash.png";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import IconButton from "../../Buttons/Icon Button/IconButton";
interface ColumnType {
  id: string;
  name: string;
  field: string;
  show: boolean;
  fixed: boolean;
}

// Props for SortableItem
interface SortableItemProps {
  column: ColumnType;
  id: string;
  index: number;
  handleCheckboxChange: (id: string) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({
  column,
  id,
  handleCheckboxChange,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="d-flex align-items-center gap-3">
        <LuEqual color="#D9D9D9" {...listeners} style={{ cursor: "move" }} />
        <Form.Check
          type="checkbox"
          checked={column.show}
          onChange={() => handleCheckboxChange(id)}
        />
        {column.name}
      </div>
      
    </div>
  );
};

// Props for ColumnDropdown
interface ColumnDropdownProps {
  Column: ColumnType[];
  setColumn: React.Dispatch<React.SetStateAction<ColumnType[]>>;
}

const ColumnDropdown: React.FC<ColumnDropdownProps> = ({
  Column = [],
  setColumn,
}) => {
  const [show, setShow] = useState(false);
  const [columns, setColumns] = useState<ColumnType[]>(
    Column.map((col, index) => ({ ...col, id: index.toString() }))
  );

  // Handle drag and drop for sorting columns
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = columns.findIndex((col) => col.id === active.id);
      const newIndex = columns.findIndex((col) => col.id === over.id);

      const newColumns = arrayMove(columns, oldIndex, newIndex);
      setColumns(newColumns);
      setColumn(newColumns);
    }
  };

  // Handle checkbox change for showing/hiding columns
  const handleCheckboxChange = (id: string) => {
    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.map((col) =>
        col.id === id ? { ...col, show: !col.show } : col
      );
      setColumn(updatedColumns);
      return updatedColumns;
    });
  };

  return (
    <Dropdown
      align="end"
      show={show}
      onToggle={(nextShow) => setShow(nextShow)}
    >
      <CustomToggle variant="secondary">
        <IconButton icon={CiViewColumn} iconSize="14">Column</IconButton>
      </CustomToggle>

      <TableDropdown show={show}>
        <DropdownHeader className="py-3 px-4">
          <MainHeading>Column</MainHeading>
        </DropdownHeader>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={columns}
            strategy={verticalListSortingStrategy}
          >
            <div className="d-flex flex-column gap-3 py-3 px-4">
              {columns.map((column, index) => (
                <SortableItem
                  key={column.id}
                  column={column}
                  id={column.id}
                  index={index}
                  handleCheckboxChange={handleCheckboxChange} // pass the handler
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </TableDropdown>
    </Dropdown>
  );
};

// Styled components
export const TableDropdown = styled(Dropdown.Menu)`
  width: 280px;
  max-height:500px;
  overflow:auto;
  border-radius: 6px;
  box-shadow: -3px 4px 23px 0px #0000001f;
  padding: 0px;
  border: 0.5px solid #b0b0b0;
`;

export const MainHeading = styled.div`
  font-size: 20px;
  font-weight: 500;
  line-height: 23.44px;
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

export default ColumnDropdown;
