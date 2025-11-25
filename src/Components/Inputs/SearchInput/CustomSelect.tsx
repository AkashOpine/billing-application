import React, { useMemo, useState } from "react";
import Select, {
  StylesConfig,
  components,
  Props as SelectProps,
} from "react-select";

type OptionType = {
  label: string;
  value: string;
};

interface CustomSelectProps {
  options: OptionType[];
  placeholder?: string;
  value: OptionType | null;
  onChange: (selectedOption: OptionType | null) => void;
  isDisabled?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isMulti?: any;
  components?: SelectProps<OptionType, false>["components"];
  getFilteredOptions?: (input: string) => OptionType[];
  optionLimit?: number;
  width?: string;
}

const getCustomStyles = (
  width: string = "160px"
): StylesConfig<OptionType, false> => ({
  control: (provided) => ({
    ...provided,
    borderRadius: "4px",
    borderColor: "#e1e3ea",
    boxShadow: "none",
    height: "35px",
    width, // ✅ dynamically set width
    outline: "none",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#747474",
    fontSize: "14px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#747474",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#747474",
    paddingRight: "8px",
  }),
});

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  isDisabled = false,
  isClearable = false,
  isSearchable = true,
  isMulti = false,
  components,
  getFilteredOptions,
  optionLimit = 2,
  width = "auto",
}) => {
  const [inputValue, setInputValue] = useState("");

  const filteredOptions = useMemo(() => {
    if (getFilteredOptions) {
      return getFilteredOptions(inputValue);
    }

    if (!inputValue) {
      return options?.slice(0, optionLimit);
    }

    return options
      .filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, optionLimit);
  }, [inputValue, options, getFilteredOptions, optionLimit]);

  return (
    <Select<OptionType, false>
      options={filteredOptions}
      styles={getCustomStyles(width)}
      placeholder={placeholder}
      value={value}
      onChange={(option) => onChange(option)}
      isDisabled={isDisabled}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isMulti={isMulti}
      components={components}
      onInputChange={(val) => setInputValue(val)}
    />
  );
};

export default CustomSelect;
