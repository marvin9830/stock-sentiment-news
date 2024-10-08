import React, { ChangeEvent } from "react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

interface MultiSelectDropdownProps {
  selectName: string;
  originalOptions: string[];
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  handleSubmit: () => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  selectName,
  originalOptions,
  selectedOptions,
  setSelectedOptions,
  handleSubmit,
}) => {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<string>("");

  const handleToggleDropdown = () => {
    setOpen(!open);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleCheckboxChange = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((selectedOptions) => selectedOptions !== value)
      );
    } else {
      setSelectedOptions((prevOptions) => [...prevOptions, value]);
    }
  };

  const handleSubmitClick = () => {
    handleSubmit();
    handleToggleDropdown();
  };

  return (
    <div className="w-1/4 relative">
      <div
        onClick={handleToggleDropdown}
        className="p-3 text-xs lg:text-base rounded-3xl flex items-center gap-2 border border-neutral-300 cursor-pointer truncate h-10 bg-white text-black">
        {selectName}
        <div className="hidden md:inline-block ml-auto">
          <MdKeyboardDoubleArrowDown />
        </div>
      </div>
      {open && (
        <div className="p-3 rounded-lg flex gap-3 w-full shadow-lg x-50 absolute flex-col bg-white dark:bg-gray-200 mt-3 z-50">
          <input
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search"
            className="border-b outline-none p-3 -mx-3 pt-0 text-black bg-white dark:bg-gray-200"
            type="text"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {originalOptions.map((name) => (
              <div
                key={name}
                className={`flex items-center  ${
                  name.toLowerCase().includes(filter.toLowerCase())
                    ? "flex"
                    : "hidden"
                }`}>
                <input
                  checked={selectedOptions.includes(name)}
                  onChange={() => handleCheckboxChange(name)}
                  id={name.toLowerCase()}
                  type="checkbox"
                  value={name}
                  className="w-4 h-4 hover:cursor-pointer rounded"
                />
                <label
                  htmlFor={name.toLowerCase()}
                  className="ml-2 text-xs lg:text-base hover:cursor-pointer text-gray-900 flex-grow">
                  {name}
                </label>
              </div>
            ))}
          </div>
          <button className="text-black" onClick={handleSubmitClick}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
