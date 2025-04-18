import { useState } from 'react';
import { Button, Input, Select, TextArea } from "../../../../shared/ui";
import styles from "./index.module.scss";
import wastebasket from '../../../../shared/assets/svg/wastebasket.svg';
import PopupDelete from './ui/PopupDelete';

interface ContainerDateProps {
  onRemove?: () => void;
}

export default function ContainerDate({ onRemove }: ContainerDateProps) {
  const [showPopup, setShowPopup] = useState(false);

  const handleRemoveClick = () => {
    setShowPopup(true);
  };

  const handleConfirmDelete = () => {
    setShowPopup(false);
    onRemove?.();
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.containerDate}>
      <div className={styles.containerDate__boxSelectInput}>
        <Select
          title="Название награды"
          placeholder="Орден мужества"
          necessarilySvg
          options={["sd"]}
        />
        <Input title="Год выдачи награды" necessarilySvg />
      </div>
      <TextArea 
        className={styles.containerDate__textArea}
        title="Описание боевого подвига или заслуги"
        // necessarilySvg
        placeholder="Дополнительные сведения"
      />
      <Button 
        className={styles.containerDate__button} 
        variant="white" 
        svg={wastebasket}
        onClick={handleRemoveClick}
      />
      
      {showPopup && (
        <PopupDelete 
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}