import React from "react";
import styles from './index.module.scss';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean; 
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "red" | "white";
  svg?: string;
}

/**
 * Кнопка для основных действий.
 * @param {string} children - Текст кнопки.
 * @param {function} onClick - Обработчик клика.
 * @param {boolean} disabled - Отвечает за активна ли кнопка.
 * @param {string} type - Тип кнокпи.
 * @param {string} className - Стили для кнопки.
 * @param {string} variant - Вариант кнопки.
 */
export default function Button({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  variant = "red",
  svg,
}: ButtonProps)  {
  return (
    <button
      onClickCapture={() => console.log('Click')}
      type={type}
      className={`${styles.button} ${styles[`button__${variant}`]} ${disabled ? styles.button__disabled : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {svg ? <img className={children ? styles.button_svg : ""} src={svg} alt="svg" /> : ''}
      {children}
    </button>
  );
};