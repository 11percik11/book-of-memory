import { Input } from '../../shared/ui';
import styles from './index.module.scss';

interface HeroInformationProps {
  className?: string;
}

export default function HeroInformation({className}: HeroInformationProps) {
  return (
    <div className={`${styles.heroInformation} ${className}`}>
      <div className={styles.heroInformation__box}>
        <Input name='herosurname' className={styles.heroInformation__input} title='Фамилия' necessarilySvg placeholder='Константинопольская'/>
        <Input name='heroname' className={styles.heroInformation__input} title='Имя' necessarilySvg placeholder='Александра'/>
        <Input name='heropatronymic' className={styles.heroInformation__input} title='Отчество'  placeholder='Александровна'/>
        <Input name='placebirth' className={styles.heroInformation__input} title='Место рождения'  placeholder='Ижевск'/>
      </div>
    </div>
  )
}