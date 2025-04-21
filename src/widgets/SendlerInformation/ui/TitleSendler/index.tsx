import styles from './index.module.scss';

interface TitleSendlerProps {
  className?: string;
}

export default function TitleSendler({className}: TitleSendlerProps) {
  return (
    <div className={`${styles.titleSendler} ${className}`}>
        <h2 className={styles.titleSendler__h2}>Информация об отправителе</h2>
        <p className={styles.titleSendler__text}>Заполните информацию о отправителе</p>
    </div>
  )
}
