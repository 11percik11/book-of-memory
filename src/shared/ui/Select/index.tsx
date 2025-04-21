import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.scss";
import cross_select from "../../assets/svg/cross_select.svg";
import Title from "../Title";
import { FieldError, useFormContext } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedError(obj: any, path: string): FieldError | undefined {
  return path.split('.').reduce((acc, part) => {
    const arrayMatch = part.match(/(\w+)\[(\d+)\]/);
    if (arrayMatch) {
      const arrayName = arrayMatch[1];
      const arrayIndex = arrayMatch[2];
      return acc && acc[arrayName] && acc[arrayName][arrayIndex];
    }
    return acc && acc[part];
  }, obj);
}

interface SelectProps {
  options: string[];
  placeholder?: string;
  onSelect?: (selectedOption: string) => void;
  className?: string;
  name: string;
  errorSelect?: string;
  title?: string;
  necessarilySvg?: boolean;
  showInput?: boolean; // New prop to control input visibility
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Выберите данные...",
  onSelect,
  className,
  name,
  errorSelect,
  title,
  necessarilySvg = false,
  showInput = true,
}) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch
  } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const formValue = watch(name);
  const error = getNestedError(errors, name) as FieldError | undefined; 
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setValue(name, option, { shouldValidate: true });
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    setValue(name, e.target.value, { shouldValidate: true });
    if (onSelect) onSelect(e.target.value);
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
        <div className={`${styles.selectHeader} ${error ? styles.selectHeader__error : ""} ${!selectedOption ? styles.selectPlacholder : ""}`} onClick={toggleDropdown}>
          {showInput ? (
            <input 
              {...register(name)}
              placeholder={placeholder} 
              className={styles.boxSelect__input} 
              value={formValue || ''} 
              onChange={handleInputChange}
              type="text" 
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
            />
          ) : (
            <div className={styles.boxSelect__display}>
              {selectedOption || placeholder}
            </div>
          )}
          <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
            <img src={cross_select} alt="" />
          </span>
        </div>
        {isOpen && (
          <div className={styles.selectList}>
            <div className={styles.optionsContainer}>
              <div key={0} onClick={() => handleOptionClick('')} className={styles.optionPlaceholder}>{placeholder}</div>
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
      {errorSelect ? <div className={styles.boxSelect__error}>{errorSelect}</div> : <></> }
      {error && (
        <span className={styles.boxSelect__error}>
          {error.message}
        </span>
      )}
      </div>
    </div>
  );
};

export default Select;