import styles from './index.module.scss'; 

export default function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.header__title}>Книга памяти «Герой моей&nbsp;семьи»</h1>
      <h2 className={styles.header__description}>
        Для добавления сведений в наш архив заполните предложенные&nbsp;поля<br/> и
        нажмите <span className={styles.header__word}>«Сохранить»</span>
      </h2>
    </div>
  );
}
