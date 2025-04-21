import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { Select, Title } from "../../../../shared/ui";
import styles from "./index.module.scss";

interface DateSelectProps {
  className?: string;
  title?: string;
  name: string;
}

export default function DateSelect({ title, name, className }: DateSelectProps) {
  const { setValue } = useFormContext();
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [error, setError] = useState("");

  const days = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
  ];
  
  const months = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) =>
    String(1900 + i)
  );

  const isLeapYear = (year: string) => {
    if (!year) return false;
    const yearNum = parseInt(year, 10);
    return (yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0;
  };

  const validateDate = () => {
    if (selectedDay === "30" && selectedMonth === "Февраль") {
      setError("Не верная дата");
      return false;
    } else if (
      selectedDay === "31" &&
      (selectedMonth === "Февраль" ||
        selectedMonth === "Апрель" ||
        selectedMonth === "Июнь" ||
        selectedMonth === "Сентябрь" ||
        selectedMonth === "Ноябрь")
    ) {
      setError("Не верная дата");
      return false;
    } else if (
      selectedDay === "29" &&
      selectedMonth === "Февраль" &&
      selectedYear &&
      !isLeapYear(selectedYear)
    ) {
      setError("Ошибка: не високосный год");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  useEffect(() => {
    if (validateDate() && selectedDay && selectedMonth && selectedYear) {
      const monthIndex = months.indexOf(selectedMonth) + 1;
      const formattedDate = `${selectedYear}-${monthIndex.toString().padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;
      setValue(name, formattedDate);
    }
  }, [selectedDay, selectedMonth, selectedYear, name, setValue]);

  return (
    <div className={`${styles.boxSelect} ${className}`}>
      {title ? <Title text={title} /> : <></>}
      <div className={styles.dateSelect}>
        <Select
          name=''
          options={days}
          placeholder="День"
          onSelect={setSelectedDay}
          className={styles.otherHeroData__BoxBirthDateAt_selectDay}
          errorSelect={error}
          showInput={false}
        />
        <Select
          name=''
          options={months}
          placeholder="Месяц"
          onSelect={setSelectedMonth}
          className={styles.otherHeroData__BoxBirthDateAt_selectMonth}
          showInput={false}
        />
        <Select
          name=''
          options={years}
          placeholder="Год"
          onSelect={setSelectedYear}
          className={styles.otherHeroData__BoxBirthDateAt_selectYear}
          showInput={false}
        />
      </div>
    </div>
  );
}