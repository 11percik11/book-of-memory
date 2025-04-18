import React, { useState } from "react";
import styles from "./index.module.scss";
import Title from "../Title";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  name?: string;
  defaultValue?: string;
  error?: string | undefined;
  title?: string;
  necessarilySvg?: boolean;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  className = "",
  disabled = false,
  name,
  defaultValue = "",
  title,
  necessarilySvg = false
}: InputProps) {
  const [localValue, setLocalValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    onChange?.(e);
  };
  return (
    <div className={`${styles.containeriInput} ${className}`}>
      {title ? <Title text={title} necessarilySvg={necessarilySvg} /> : <></>}
      <input
        type={type}
        placeholder={placeholder}
        className={`${styles.input}`}
        disabled={disabled}
        name={name}
        value={value !== undefined ? value : localValue}
        onChange={handleChange}
      />
      {error ? <span className={styles.input__error}>{error}</span> : <></>}
    </div>
  );
}
