import { useState, useEffect } from "react";
import { useGetMilitaryRanksQuery, useLazyGetMilitaryRanksQuery } from "../../entities/Hero/api/heroApi";
import { Select } from "../../shared/ui";
import styles from "./index.module.scss";
import DateSelect from "./ui/DateSelect";
import {MilitaryRanks } from '../../entities/Hero/model/types';
import { useDispatch } from "react-redux";
import { setCategory } from "../../entities/Hero/api/heroSlice";

interface OtherHeroDataProps {
  className?: string;
}

export default function OtherHeroData({ className }: OtherHeroDataProps) {
  const dispatch = useDispatch();
  const [militaryRanks, setMilitaryRanks] = useState<MilitaryRanks[]>([]);
  const category = [
    "Герои Великой Отечественной войны",
    "Труженики тыла",
    "Герои локальных войн",
    "Герои - ликвидаторы ЧС",
    "Герои СВО"
  ];
  
  const { data, isLoading, error } = useGetMilitaryRanksQuery({ category: "" });
  const [trigger] = useLazyGetMilitaryRanksQuery();

  useEffect(() => {
    if (data) {
      setMilitaryRanks(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const handleCategoryChange = (e: string) => {
    dispatch(setCategory({ category: e }));  
    trigger({ category: e })
      .unwrap()
      .then((responseData) => {
        setMilitaryRanks(responseData);
      })
      .catch((error) => {
        console.error("Ошибка при фильтрации:", error);
      });
  };
  
  const militaryRankTitles = militaryRanks.map(rank => rank.title);

  return (
    <div className={`${styles.otherHeroData} ${className}`}>
      <div className={styles.otherHeroData__row}>
        <Select
          name="herocategory"
          className={`${styles.otherHeroData__rowSelect} ${styles.otherHeroData__input}`}
          options={category}
          title="Категория героя"
          necessarilySvg
          placeholder="Нет"
          onSelect={handleCategoryChange}
          showInput={false}
        />
        <Select
          name="militaryrank"
          className={`${styles.otherHeroData__input} ${styles.otherHeroData__input}`}
          options={militaryRankTitles}
          title="Воинское звание"
          necessarilySvg
          placeholder="Нет"
        />
        <DateSelect className={styles.otherHeroData__input}  name="birthDateAt" title="Дата рождения" />
        <DateSelect className={styles.otherHeroData__input} name="deathDateAt" title="Дата смерти" />
      </div>
    </div>
  );
}