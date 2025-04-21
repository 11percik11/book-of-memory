import { Input } from '../../../../shared/ui';
import styles from './index.module.scss';

interface ContainerDateSendlerProps {
  className?: string;
}

export default function ContainerDateSendler({className}: ContainerDateSendlerProps) {
  return (
    <div className={`${styles.containerDateSendler} ${className}`}>
        <div className={styles.containerDateSendler__box}>
        <Input name="surname" className={`${styles.containerDateSendler__input} ${styles.containerDateSendler__item1}`} title='Фамилия' necessarilySvg placeholder='Константинопольская'/>
        <Input name="name" className={`${styles.containerDateSendler__input} ${styles.containerDateSendler__item2}`} title='Имя' necessarilySvg placeholder='Александра'/>
        <Input name="patronymic" className={`${styles.containerDateSendler__input} ${styles.containerDateSendler__item3}`} title='Отчество'  placeholder='Александровна'/>
        <Input name="phone" className={`${styles.containerDateSendler__input} ${styles.containerDateSendler__item4}`} title='Номер телефона' necessarilySvg placeholder='+7 (912) 999 99-99'/>
        <Input name="organization" className={`${styles.containerDateSendler__input} ${styles.containerDateSendler__item5}`} title='Организация' necessarilySvg placeholder='Организация'/>
      </div>
    </div>
  )
}
