import { useEffect, useState } from "react";
import { Select, Title } from "../../../../shared/ui";
import styles from "./index.module.scss";

interface DateSelectProps {
  title?: string;
}

export default function DateSelect({ title }: DateSelectProps) {
  const days = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [error, setError] = useState("");

  const isLeapYear = (year: string) => {
    if (!year) return false;
    const yearNum = parseInt(year, 10);
    return (yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0;
  };

  const DateError = () => {
    if (selectedDay === "30" && selectedMonth === "Февраль") {
      setError("Не верная дата");
    } else if (
      selectedDay === "31" &&
      (selectedMonth === "Февраль" ||
        selectedMonth === "Апрель" ||
        selectedMonth === "Июнь" ||
        selectedMonth === "Сентябрь" ||
        selectedMonth === "Ноябрь")
    ) {
      setError("Не верная дата");
    } else if (
      selectedDay === "29" &&
      selectedMonth === "Февраль" &&
      selectedYear &&
      !isLeapYear(selectedYear)
    ) {
      setError("Не верная дата (не високосный год)");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    DateError();
  }, [selectedDay, selectedMonth, selectedYear]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) =>
    String(1900 + i)
  );

  return (
    <div className={styles.boxSelect}>
      {title ? <Title text={title} /> : <></>}
      <div className={styles.dateSelect}>
        <Select
          options={days}
          placeholder="Нет"
          onSelect={setSelectedDay}
          className={styles.otherHeroData__BoxBirthDateAt_selectDay}
          error={error}
          showInput={false}
        />
        <Select
          options={months}
          placeholder="Нет"
          onSelect={setSelectedMonth}
          className={styles.otherHeroData__BoxBirthDateAt_selectMonth}
          showInput={false}
        />
        <Select
          options={years}
          placeholder="Нет"
          onSelect={setSelectedYear}
          className={styles.otherHeroData__BoxBirthDateAt_selectYear}
          showInput={false}
        />
      </div>
    </div>
  );
}
