import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.scss";
import cross_select from "../../assets/svg/cross_select.svg";
import Title from "../Title";
import { FieldError, useFormContext } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedError(obj: any, path: string): FieldError | undefined {
  return path.split('.').reduce((acc, part) => {
    // Обработка массивов типа awards.0.year
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
  title?: string;
  necessarilySvg?: boolean;
  showInput?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select...",
  onSelect,
  className,
  name,
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
  const selectRef = useRef<HTMLDivElement>(null);
  const formValue = watch(name);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setValue(name, option, { shouldValidate: true });
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(name, value, { shouldValidate: true });
    if (onSelect) onSelect(value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const error = getNestedError(errors, name) as FieldError | undefined;

  return (
    <div className={`${styles.boxSelect} ${className}`}>
      {title && <Title text={title} necessarilySvg={necessarilySvg} />}
      <div className={`${styles.selectContainer}`} ref={selectRef}>
        <div 
          className={`${styles.selectHeader} ${!formValue ? styles.selectPlacholder : ""}`} 
          onClick={toggleDropdown}
        >
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
              {formValue || placeholder}
            </div>
          )}
          <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
            <img src={cross_select} alt="" />
          </span>
        </div>
        {isOpen && (
          <div className={styles.selectList}>
            <div className={styles.optionsContainer}>
              <div 
                key={0} 
                onClick={() => handleOptionClick('')} 
                className={styles.optionPlaceholder}
              >
                {placeholder}
              </div>
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