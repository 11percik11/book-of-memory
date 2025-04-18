import styles from "./index.module.scss";
import plusImg from "../../../../shared/assets/svg/plus_img.svg";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import crossblack from "../../../../shared/assets/svg/crossblack.svg";

export default function FieldArchiveMaterials() {
  const [files, setFiles] = useState<Array<{ url: string; type: 'image' | 'video' }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILES = 10;
  const MAX_IMAGE_SIZE = 8 * 1024 * 1024; // 8MB
  const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
  
  const onDrop = (acceptedFiles: File[]) => {
    const remainingSlots = MAX_FILES - files.length;
    if (remainingSlots <= 0) return;
    
    const filteredFiles = acceptedFiles.slice(0, remainingSlots).filter((file) => {
      if (file.type.match('image.*')) {
        if (file.size > MAX_IMAGE_SIZE) {
          alert(`Image ${file.name} is too large (max ${MAX_IMAGE_SIZE/1024/1024}MB)`);
          return false;
        }
        return true;
      } else if (file.type.match('video.*')) {
        if (file.size > MAX_VIDEO_SIZE) {
          alert(`Video ${file.name} is too large (max ${MAX_VIDEO_SIZE/1024/1024}MB)`);
          return false;
        }
        return true;
      }
      return false;
    });

    if (filteredFiles.length === 0) return;

    const newFiles = [...files];
    let loadedCount = 0;

    filteredFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newFiles.push({
            url: event.target.result as string,
            type: file.type.match('video.*') ? 'video' : 'image'
          });
          loadedCount++;
          if (loadedCount === filteredFiles.length) {
            setFiles(newFiles);
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
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    onDrop,
  });

  const triggerFileInput = () => {
    if (files.length < MAX_FILES) {
      fileInputRef.current?.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && files.length < MAX_FILES) {
      onDrop(Array.from(e.target.files));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={styles.fieldArchiveMaterials}>
      {files.length < MAX_FILES && (
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
            accept="image/*, video/*"
            multiple
            style={{ display: "none" }}
          />
        </div>
      )}
      <div className={styles.fieldArchiveMaterials__slider}>
        {files.length > 0 ? (
          files.map((file, index) => (
            <div key={index} className={styles.BoxImg}>
              {file.type === 'image' ? (
                <img
                  src={file.url}
                  alt={`Preview ${index}`}
                  className={`${styles.fieldArchiveMaterials__imgArr} ${styles.previewImage}`}
                />
              ) : (
                <video 
                  className={`${styles.fieldArchiveMaterials__imgArr} ${styles.fieldArchiveMaterials__previewVideo}`}
                  controls
                >
                  <source src={file.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <div
                onClick={() => handleRemoveFile(index)}
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