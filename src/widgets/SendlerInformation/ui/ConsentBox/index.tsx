import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/ui";
import styles from "./index.module.scss";
// import { useFormContext } from "react-hook-form";

export default function ConsentBox() {
  const navigate = useNavigate();

  // const { formState: { isValid, isSubmitting } } = useFormContext();
  return (
    <div className={styles.consentBox}>
      <p className={styles.consentBox__text}>
        Нажимая кнопку "Сохранить" вы подтверждаете <span onClick={() => navigate('/consent')} className={styles.consentBox__span}>согласие на обработку персональных данных</span>
      </p>
      <Button type="submit" className={styles.consentBox__button} variant="red">СОХРАНИТЬ</Button>
    </div>
  );
}
