import styles from './index.module.scss';

export default function TitleArchiveMaterials() {
  return (
    <div className={styles.titleArchiveMaterials}>
        <p className={styles.titleArchiveMaterials__title}>Материалы архива</p>
        <p className={styles.titleArchiveMaterials__text}>Можно загрузить до 10 шт. Разрешённые типы файлов: .jpg .png .mp4 . Максимальный размер фото: 8 МБ, видео: 100МБ.</p>
    </div>
  )
}
