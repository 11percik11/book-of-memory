import { Input } from '../../../../shared/ui';
import styles from './index.module.scss';

export default function ContainerDateSendler() {
  return (
    <div className={styles.containerDateSendler}>
        <div className={styles.containerDateSendler__box}>
        <Input name="surname" className={styles.containerDateSendler__input} title='Фамилия' necessarilySvg placeholder='Константинопольская'/>
        <Input name="name" className={styles.containerDateSendler__input} title='Имя' necessarilySvg placeholder='Александра'/>
        <Input name="patronymic" className={styles.containerDateSendler__input} title='Отчество'  placeholder='Александровна'/>
        <Input name="phone" className={styles.containerDateSendler__input} title='Номер телефона' necessarilySvg placeholder='+7 (912) 999 99-99'/>
      </div>
    </div>
  )
}
