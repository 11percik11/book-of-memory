import { Controller, useFormContext } from "react-hook-form";
import ArchiveMaterials from "../../features/ArchiveMaterials";
import HeroInformation from "../../features/HeroInformation";
import OtherHeroData from "../../features/OtherHeroData";
import ImageSlider from "../../features/SliderImg";
import { TextArea } from "../../shared/ui";
import styles from "./index.module.scss";

export default function InformationField() {
  const { control } = useFormContext();

  return (
    <>
      <div className={styles.informationField}>
      <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <ImageSlider 
              className={styles.informationField__imageSlider}
              value={field.value || []}
              onChange={field.onChange}
            />
          )}
        />
        <HeroInformation className={styles.informationField__heroInformation}/>
        <OtherHeroData className={styles.informationField__otherHeroData}/>
      </div>
      <TextArea name="additionalInformation" className={styles.informationField__textArea} title="Дополнительные сведения" placeholder="Биография и другие сведения"/>
      <ArchiveMaterials/>
    </>
  );
}
