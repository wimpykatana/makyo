import React, { useState, useEffect, useRef } from 'react';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface SearchableDropdownProps {
  options: DropdownOption[];
  onChange: (selected: DropdownOption[]) => void;
  multiple?: boolean;
  placeholder?: string;
  renderOption?: (option: DropdownOption) => React.ReactNode;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  onChange,
  multiple = false,
  placeholder = 'Select...',
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  
  const handleOptionClick = (option: DropdownOption) => {
    if (multiple) {
      setSelectedOptions((prev) => {
        const isSelected = prev.some((selected) => selected.value === option.value);
        if (isSelected) {
          return prev.filter((selected) => selected.value !== option.value);
        }
        return [...prev, option];
      });
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const highlightOption = (label: string) => {
    const startIndex = label.toLowerCase().indexOf(searchTerm.toLowerCase());
    const endIndex = startIndex + searchTerm.length;
    return (
      <>
        {label.slice(0, startIndex)}
        <span className='bg-blue-300'>{label.slice(startIndex, endIndex)}</span>
        {label.slice(endIndex)}
      </>
    );
  }

  const removeItem = (id: number) => {
    setSelectedOptions((prev) => prev.filter((_, i) => i !== id));
  }

  const renderSelectedOptions = (item: string, id) => {
    return(
        <span className='bg-blue-300 rounded-full px-2 py-1.5 mr-1 inline-block'>
            {item}
            <span className={`text-xs text-gray-500 ml-1 cursor-pointer ${id}`} onClick={() => removeItem(id)}>x</span>
        </span>
    )
  }
  

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  return (
    <div ref={dropdownRef} className='z-1000 bg-white border border-gray-300 shadow-md text-black w-[calc(100%-15px)] px-3 py-1.5 mx-2 min-w-[200px]'>
      <div onClick={toggleDropdown} className='cursor-pointer'>
        {/*{selectedOptions.length > 0
          ? selectedOptions.map((option) => option.label).join(', ')
          : placeholder}*/}

        {selectedOptions.length > 0
          ? selectedOptions.map((option, x) => renderSelectedOptions(option.label, x))
          : placeholder}

      </div>
      {isOpen && (
        <div>
          <input
            type="text"
            //className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
          <div>
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                //className={styles.option}
                onClick={() => handleOptionClick(option)}
              >
               {renderOption ? renderOption(option) : highlightOption(option.label)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;