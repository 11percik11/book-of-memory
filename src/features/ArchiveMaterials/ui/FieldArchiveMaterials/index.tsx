import styles from "./index.module.scss";
import plusImg from "../../../../shared/assets/svg/plus_img.svg";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import crossblack from "../../../../shared/assets/svg/crossblack.svg";

export default function FieldArchiveMaterials() {
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGES = 10; // Maximum number of images allowed
  console.log(images);
  console.log(images);
    
  const onDrop = (acceptedFiles: File[]) => {
    // Calculate how many more images we can add
    const remainingSlots = MAX_IMAGES - images.length;
    if (remainingSlots <= 0) return;
    const imageFiles = acceptedFiles.filter((file) =>
      file.type.match("image.*")
    ).slice(0, remainingSlots); // Only take as many as we can fit
    
    if (imageFiles.length === 0) return;

    const newImages = [...images];
    let loadedCount = 0;

    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result as string);
          loadedCount++;
          if (loadedCount === imageFiles.length) {
            setImages(newImages);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    onDrop,
  });

  const triggerFileInput = () => {
    if (images.length < MAX_IMAGES) {
      fileInputRef.current?.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && images.length < MAX_IMAGES) {
      onDrop(Array.from(e.target.files));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={styles.fieldArchiveMaterials}>
      {images.length < MAX_IMAGES && (
        <div
          {...getRootProps()}
          className={styles.fieldArchiveMaterials__boxPlusImg}
          onClick={triggerFileInput}
        >
          <input {...getInputProps()} />
          <img src={plusImg} alt="Plus img" />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept="image/*"
            multiple
            style={{ display: "none" }}
          />
        </div>
      )}
      <div className={styles.fieldArchiveMaterials__slider}>
        {images.length > 0 ? (
          images.map((img, index) => (
            <div key={index} className={styles.BoxImg}>
              <img
                src={img}
                alt={`Preview ${index}`}
                className={`${styles.fieldArchiveMaterials__imgArr} ${styles.previewImage}`}
              />
              <div
                onClick={() => handleRemoveImage(index)}
                className={styles.BoxImg__boxSvg}
              >
                <img
                  className={styles.BoxImg__CrossBalck}
                  src={crossblack}
                  alt="Remove"
                />
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}