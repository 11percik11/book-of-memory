import styles from './index.module.scss';

export default function TitleSendler() {
  return (
    <div className={styles.titleSendler}>
        <h2 className={styles.titleSendler__h2}>Информация об отправителе</h2>
        <p className={styles.titleSendler__text}>Заполните информацию о отправителе</p>
    </div>
  )
}
