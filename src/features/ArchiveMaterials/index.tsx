import styles from './index.module.scss';
import FieldArchiveMaterials from './ui/FieldArchiveMaterials';
import TitleArchiveMaterials from './ui/TitleArchiveMaterials';

export default function ArchiveMaterials() {
  return (
    <div className={styles.archiveMaterials}>
        <TitleArchiveMaterials/>
        <FieldArchiveMaterials/>
    </div>
  )
}
