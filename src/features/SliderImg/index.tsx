import Button from '../../shared/ui/Button';
import styles from './index.module.scss';
import Slider from './Slider';
import wastebasket_24 from '../../shared/assets/svg/wastebasket_24.svg';
import { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageSliderProps {
  className?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({className}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxImgValue = 10;
  const maxFileSize = 8 * 1024 * 1024;
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > maxImgValue) {
      return;
    }

    const imageFiles = acceptedFiles.filter(file => 
      file.type.match('image.*') && file.size <= maxFileSize
    );
    
    if (imageFiles.length === 0) return;

    
    
    const newImages = [...images];
    let loadedCount = 0;
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result as string);
          loadedCount++;
          if (loadedCount === imageFiles.length) {
            setImages(newImages);
            setCurrentIndex(newImages.length - 1);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    onDrop,
    disabled: images.length >= maxImgValue
  });

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onDrop(Array.from(e.target.files));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerFileDelete = () => {
    if (images.length === 0) return;
    const newImages = images.filter((_, index) => index !== currentIndex);
    setImages(newImages);
    
    if (newImages.length === 0) {
      setCurrentIndex(0); 
    } else if (currentIndex >= newImages.length) {
      setCurrentIndex(newImages.length - 1); 
    }
  };

  return (
    <div 
      {...getRootProps()}
      className={`${styles.contanerSlider} ${className} ${isDragActive ? styles.dragging : ''}`}
    >
      <input {...getInputProps()} />
      <div className={styles.contanerSlider__slider}>
        <Slider 
          currentIndex={currentIndex} 
          setCurrentIndex={setCurrentIndex} 
          images={images}
        />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        multiple
        style={{ display: 'none' }}
      />
      <div className={styles.contanerSlider__boxButton}>
        <Button 
          disabled={images.length >= maxImgValue} 
          onClick={triggerFileInput} 
          className={styles.contanerSlider__boxButton_item1} 
          variant="red"
        >
          ЗАГРУЗИТЬ ФОТО
        </Button>
        <Button 
          disabled={images.length === 0} 
          onClick={triggerFileDelete} 
          className={styles.contanerSlider__boxButton_item2} 
          variant="white" 
          svg={wastebasket_24}
        />
      </div>
      <p className={styles.contanerSlider__text}>Можно загрузить до 10 шт. Разрешённые типы файлов: .jpg .png . Максимальный размер фото: 8 МБ</p>
    </div>
  );
};

export default ImageSlider;