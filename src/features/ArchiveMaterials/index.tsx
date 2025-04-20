import { Controller, useFormContext } from 'react-hook-form';
import styles from './index.module.scss';
import FieldArchiveMaterials from './ui/FieldArchiveMaterials';
import TitleArchiveMaterials from './ui/TitleArchiveMaterials';

export default function ArchiveMaterials() {
  const { control } = useFormContext();
  return (
    <div className={styles.archiveMaterials}>
        <TitleArchiveMaterials/>
        <Controller
        name="archive"
        control={control}
        render={({ field }) => (
          <FieldArchiveMaterials 
            value={field.value || []}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  )
}
