import { useEffect, useState } from "react";
import { Button, Input, Select, TextArea } from "../../../../shared/ui";
import styles from "./index.module.scss";
import wastebasket from "../../../../shared/assets/svg/wastebasket.svg";
import PopupDelete from "./ui/PopupDelete";
import { useGetHeroAwardQuery } from "../../../../entities/Hero/api/heroApi";
import { heroAwardAll } from "../../../../entities/Hero/model/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store/store";

interface ContainerDateProps {
  onRemove?: () => void;
  index: number;
}

export default function ContainerDate({ onRemove, index }: ContainerDateProps) {
  const [heroAward, setHeroAward] = useState<heroAwardAll[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const category = useSelector((state: RootState) => state.hero.category);
  const { data, isLoading, error, refetch } = useGetHeroAwardQuery({
    category: category,
  });

  useEffect(() => {
    if (data) {
      setHeroAward(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [category, refetch]);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const militaryRanks =
    heroAward?.map((award) => ({ title: award.title })) || [];
  const militaryRankTitles = militaryRanks.map((rank) => rank.title);

  return (
    <div className={styles.containerDate}>
      <div className={styles.containerDate__boxSelectInput}>
        <Select
          name={`awards.${index}.title`}
          options={militaryRankTitles}
          title="Название награды"
          placeholder="Нет"
          necessarilySvg
        />
        <Input
          name={`awards.${index}.year`}
          title="Год выдачи награды"
          necessarilySvg
        />
      </div>
      <TextArea
        name={`awards.${index}.descriptionMilitary`}
        className={styles.containerDate__textArea}
        title="Описание боевого подвига или заслуги"
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
