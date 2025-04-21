import React, { useState } from "react";
import styles from "./index.module.scss";
import Title from "../Title";
import { FieldError, useFormContext } from "react-hook-form";

// Добавьте эту функцию перед компонентом
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

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  name: string;
  defaultValue?: string;
  title?: string;
  necessarilySvg?: boolean;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  disabled = false,
  name,
  defaultValue = "",
  title,
  necessarilySvg = false,
}: InputProps) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    onChange?.(e);
  };

  const error = getNestedError(errors, name) as FieldError | undefined;
  
  return (
    <div className={`${styles.containeriInput} ${className}`}>
      {title ? <Title text={title} necessarilySvg={necessarilySvg} /> : <></>}
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`${styles.containeriInput__input}  ${error ? styles.containeriInput__input_error : ""}`}
        disabled={disabled}
        name={name}
        value={value !== undefined ? value : localValue}
        onChange={handleChange}
      />
      {error && (
        <span className={styles.containeriInput__error}>
          {error.message}
        </span>
      )}
    </div>
  );
}