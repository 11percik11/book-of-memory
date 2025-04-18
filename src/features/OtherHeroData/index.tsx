import { Select } from "../../shared/ui";
import styles from "./index.module.scss";
import DateSelect from "./ui/DateSelect";

interface OtherHeroDataProps {
  className?: string;
}

export default function OtherHeroData({className}: OtherHeroDataProps) {
  const category = ["Герои Великой Отечественной войны", "Труженики тыла", "Герои локальных войн", "Герои - ликвидаторы ЧС",];
  return (
    <div className={`${styles.otherHeroData} ${className}`}>
      <div className={styles.otherHeroData__row}>
        <Select
          className={styles.otherHeroData__rowSelect}
          options={category}
          title="Категория героя"
          necessarilySvg
          placeholder="Нет"
          showInput = {false}
        />
        <Select
          className={styles.otherHeroData__input}
          options={['rtere']}
          title="Воинское звание"
          necessarilySvg
          placeholder="Нет"
        />
      </div>
      <div className={styles.otherHeroData__boxDate}>
        <DateSelect title="Дата рождения"/>
        <DateSelect title="Дата смерти"/>
      </div>
    </div>
  );
}
