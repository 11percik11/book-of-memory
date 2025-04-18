import styles from './index.module.scss';

export default function TitleAwards() {
  return (
    <div className={styles.titleAwards}>
        <h2 className={styles.titleAwards__h2}>Награды героя</h2>
        <p className={styles.titleAwards__text}>Заполните информацию о наградах героя</p>
    </div>
  )
}
