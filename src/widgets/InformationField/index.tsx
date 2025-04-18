import ArchiveMaterials from "../../features/ArchiveMaterials";
import HeroInformation from "../../features/HeroInformation";
import OtherHeroData from "../../features/OtherHeroData";
import ImageSlider from "../../features/SliderImg";
import { TextArea } from "../../shared/ui";
import styles from "./index.module.scss";

export default function InformationField() {
  return (
    <>
      <div className={styles.informationField}>
        <ImageSlider className={styles.informationField__imageSlider}/>
        <HeroInformation className={styles.informationField__heroInformation}/>
        <OtherHeroData className={styles.informationField__otherHeroData}/>
      </div>
      <TextArea className={styles.informationField__textArea} title="Дополнительные сведения" placeholder="Биография и другие сведения"/>
      <ArchiveMaterials/>
    </>
  );
}
