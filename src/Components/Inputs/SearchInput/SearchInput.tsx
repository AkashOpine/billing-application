import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
import './SearchInput.scss';

interface SearchInputProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "Search", onChange }) => {
  return (
    <div className="side-search-bar">
      <InputGroup>
        <InputGroup.Text>
          <CiSearch size={27} className="search-icon" />
        </InputGroup.Text>
        <Form.Control type="text" placeholder={placeholder} onChange={onChange} />
      </InputGroup>
    </div>
  );
};

export default SearchInput;
