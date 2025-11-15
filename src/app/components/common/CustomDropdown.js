"use client";
import { useState, useRef, useEffect } from "react";

export default function CustomDropdown({ className, options = [], placeholder, value, onChange, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);
  const handleSelect = (option) => {
    setSelected(option);
    onChange?.(option);
    setIsOpen(false);
  };
  const selectorValue = className ? className : '';

  // Sync internal state when external value changes (supports reset())
  useEffect(() => {
    if (typeof value === "string") {
      setSelected(value || "");
    } else if (value == null) {
      setSelected("");
    }
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`select-dropdown ${selectorValue}`} ref={dropdownRef}>

      <div
        className={`glassy-field glassy-dropdown cursor-pointer flex justify-between items-center ${
          isOpen ? "border-white/60" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${selected ? "text-white" : "text-white/60"}`}>
          {selected || placeholder}
        </span>

        {/* Custom dropdown arrow */}
        <svg
          className={` ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>

      {/* Dropdown list */}
      {isOpen && (
        <ul className="">
          {options.map((option, i) => (
            <li
              key={i}
              onClick={() => handleSelect(option)}
              className=""
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
