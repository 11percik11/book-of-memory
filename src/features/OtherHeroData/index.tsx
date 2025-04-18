import { Select } from "../../shared/ui";
import styles from "./index.module.scss";
import DateSelect from "./ui/DateSelect";

interface OtherHeroDataProps {
  className?: string;
}

export default function OtherHeroData({className}: OtherHeroDataProps) {
  return (
    <div className={`${styles.otherHeroData} ${className}`}>
      <div className={styles.otherHeroData__row}>
        <Select
          className={styles.otherHeroData__rowSelect}
          options={['wer']}
          title="Воинское звание"
          necessarilySvg
          placeholder="Воинское звание"
        />
        <Select
          className={styles.otherHeroData__input}
          options={['rtere']}
          title="Воинское звание"
          necessarilySvg
          placeholder="Майор"
        />
      </div>
      <div className={styles.otherHeroData__boxDate}>
        <DateSelect title="Дата рождения"/>
        <DateSelect title="Дата смерти"/>
      </div>
    </div>
  );
}
