import { Button } from "../../../../../../shared/ui";
import styles from "./index.module.scss";
import wastebasketRed from "../../../../../../shared/assets/svg/wastebasketRed.svg";

interface PopupDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function PopupDelete({ onConfirm, onCancel }: PopupDeleteProps) {
  return (
    <div className={styles.popupDelete}>
      <div className={styles.popupDelete__content}>
        <img src={wastebasketRed} alt="wastebasket Red" />
        <div className={styles.popupDelete__boxText}>
          <h3 className={styles.popupDelete__title}>Удаление награды</h3>
          <p className={styles.popupDelete__text}>
            Вы уверены, что хотите удалить награду?
          </p>
        </div>

        <div className={styles.popupDelete__buttons}>
          <Button
            variant="white"
            className={styles.popupDelete__button}
            onClick={onCancel}
          >
            Не удалять
          </Button>
          <Button
            variant="red"
            className={styles.popupDelete__button}
            onClick={onConfirm}
          >
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
}
