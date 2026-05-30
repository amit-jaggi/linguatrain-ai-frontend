import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./custom-dropdown.scss";

const CustomDropdown = ({
    options = [],
    selectedOption,
    onSelect,
    placeholder = "Select an option",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <div
                className="dropdown-header"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption?.label || placeholder}

                <FaChevronDown
                    className={`arrow ${isOpen ? "open" : ""}`}
                />
            </div>

            {isOpen && (
                <ul className="dropdown-list">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`dropdown-item`}
                            onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;