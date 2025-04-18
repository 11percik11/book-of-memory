import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.scss";
import cross_select from "../../assets/svg/cross_select.svg";
import Title from "../Title";

interface SelectProps {
  options: string[];
  placeholder?: string;
  onSelect?: (selectedOption: string) => void;
  className?: string;
  error?: string;
  title?: string;
  necessarilySvg?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select...",
  onSelect,
  className,
  error,
  title,
  necessarilySvg = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.boxSelect} ${className}`}>
      {title ? <Title text={title} necessarilySvg={necessarilySvg} /> : <></>}
      <div className={`${styles.selectContainer}`} ref={selectRef}>
        <div className={styles.selectHeader} onClick={toggleDropdown}>
          {selectedOption || placeholder}
          <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
            <img src={cross_select} alt="" />
          </span>
        </div>
        {isOpen && (
          <div className={styles.selectList}>
            <div className={styles.optionsContainer}>
              <div key={0} onClick={() => handleOptionClick(placeholder)} className={styles.optionPlaceholder}>{placeholder}</div>
              {options.map((option, index) => (
                <div
                  key={index + 1}
                  className={styles.optionItem}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      {error ? <div className={styles.boxSelect__error}>{error}</div> : <></> }
      </div>
    </div>
  );
};

export default Select;
