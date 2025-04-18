import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/ui";
import styles from "./index.module.scss";

export default function ConsentBox() {
  const navigate = useNavigate();
  return (
    <div className={styles.consentBox}>
      <p className={styles.consentBox__text}>
        Нажимая кнопку "Сохранить" вы подтверждаете <span onClick={() => navigate('/consent')} className={styles.consentBox__span}>согласие на обработку персональных данных</span>
      </p>
      <Button className={styles.consentBox__button} variant="red">СОХРАНИТЬ</Button>
    </div>
  );
}
