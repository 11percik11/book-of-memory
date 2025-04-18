import { Input } from '../../shared/ui';
import styles from './index.module.scss';

interface HeroInformationProps {
  className?: string;
}

export default function HeroInformation({className}: HeroInformationProps) {
  return (
    <div className={`${styles.heroInformation} ${className}`}>
      <div className={styles.heroInformation__box}>
        <Input className={styles.heroInformation__input} title='Фамилия' necessarilySvg placeholder='Константинопольская'/>
        <Input className={styles.heroInformation__input} title='Имя' necessarilySvg placeholder='Александра'/>
        <Input className={styles.heroInformation__input} title='Отчество'  placeholder='Александровна'/>
        <Input className={styles.heroInformation__input} title='Место рождения'  placeholder='Ижевск'/>
      </div>
    </div>
  )
}