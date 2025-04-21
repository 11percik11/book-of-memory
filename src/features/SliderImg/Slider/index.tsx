import React from "react";
import styles from "./index.module.scss";
import crosss_left from "../../../shared/assets/svg/cross_left.svg";
import crosss_right from "../../../shared/assets/svg/cross_right.svg";
import plusImg from "../../../shared/assets/svg/plus_img.svg";

interface SliderProps {
  images: string[];
  currentIndex: number;
  setCurrentIndex: (currentIndex: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  images,
  currentIndex,
  setCurrentIndex,
}) => {
  const goToPrevious = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(images.length - 1);
    }
  };
  const goToNext = () => {
    if (currentIndex != images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className={styles.slider}>
      {images.length ? (
        <>
          {images.length != 1 ? (
            <button
              type="button"
              className={styles.slider__arrowLeft}
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <img src={crosss_left} alt="Previous image" />
            </button>
          ) : (
            <></>
          )}
          <div className={styles.slider__slide}>
            <img
              src={images[currentIndex]}
              alt={`Hero image ${currentIndex}`}
              className={styles.slider__image}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/path-to-default-image.jpg";
              }}
            />
          </div>
          {images.length != 1 ? (
            <button
              type="button"
              className={styles.slider__arrowRight}
              onClick={goToNext}
              aria-label="Next image"
            >
              <img src={crosss_right} alt="Next image" />
            </button>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div className={styles.slider__boxText}>
          <img src={plusImg} alt="Plus img" />
          <p className={styles.slider__text1}>Перетещите изображение сюда. </p>
          <p className={styles.slider__text2}>
            Рекомендуемый размер фотографии 400х400px
          </p>
        </div>
      )}
    </div>
  );
};

export default Slider;
