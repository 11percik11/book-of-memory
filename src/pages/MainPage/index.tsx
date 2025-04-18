import { FormProvider, useForm } from "react-hook-form";
import Header from "../../widgets/Header";
import InformationField from "../../widgets/InformationField";
import styles from "./index.module.scss";
import HeroAwards from "../../widgets/HeroAwards";
import SendlerInformation from "../../widgets/SendlerInformation";

export default function MainPage() {
  const methods = useForm();
  return (
    <div className={styles.mainpage}>
      <Header />
      <hr className={styles.hrLine} />
      <FormProvider {...methods}>
        <InformationField />
        <hr className={styles.hrLine} />
        <HeroAwards/>
        <hr className={styles.hrLine} />
        <SendlerInformation/>
      </FormProvider>
    </div>
  );
}
