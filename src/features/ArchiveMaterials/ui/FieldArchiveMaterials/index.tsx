import styles from "./index.module.scss";
import plusImg from "../../../../shared/assets/svg/plus_img.svg";
import { useRef, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import crossblack from "../../../../shared/assets/svg/crossblack.svg";

interface FileItem {
  id?: number;
  image: string;
  applicationForm?: string;
  imageFile?: string;
  type: 'image' | 'video';
}

interface FieldArchiveMaterialsProps {
  value?: FileItem[];
  onChange?: (files: FileItem[]) => void;
}

export default function FieldArchiveMaterials({ value = [], onChange }: FieldArchiveMaterialsProps) {
  const [files, setFiles] = useState<FileItem[]>(value);
  console.log(files);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILES = 10;
  const MAX_IMAGE_SIZE = 8 * 1024 * 1024; // 8MB
  const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

  useEffect(() => {
    setFiles(value);
  }, [value]);

  const isFileAlreadyAdded = (fileContent: string) => {
    return files.some(existingFile => existingFile.image === fileContent);
  };

  const onDrop = (acceptedFiles: File[]) => {
    const remainingSlots = MAX_FILES - files.length;
    if (remainingSlots <= 0) return;
    
    const filteredFiles = acceptedFiles.slice(0, remainingSlots).filter((file) => {
      if (file.type.match('image.*')) {
        if (file.size > MAX_IMAGE_SIZE) {
          return false;
        }
        return true;
      } else if (file.type.match('video.*')) {
        if (file.size > MAX_VIDEO_SIZE) {
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
          const fileContent = event.target.result as string;
          
          if (isFileAlreadyAdded(fileContent)) {
            loadedCount++;
            if (loadedCount === filteredFiles.length) {
              setFiles(newFiles);
              onChange?.(newFiles);
            }
            return;
          }

          const newFile: FileItem = {
            id: Date.now(),
            image: fileContent,
            imageFile: file.name,
            type: file.type.match('video.*') ? 'video' : 'image'
          };
          newFiles.push(newFile);
          loadedCount++;
          if (loadedCount === filteredFiles.length) {
            setFiles(newFiles);
            onChange?.(newFiles);
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
    const newFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(newFiles);
    onChange?.(newFiles);
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
        {files.map((file, index) => (
          <div key={file.id || index} className={styles.BoxImg}>
            {file.type === 'image' ? (
              <img
                src={file.image}
                alt={`Preview ${index}`}
                className={`${styles.fieldArchiveMaterials__imgArr} ${styles.previewImage}`}
              />
            ) : (
              <video 
                className={`${styles.fieldArchiveMaterials__imgArr} ${styles.fieldArchiveMaterials__previewVideo}`}
                controls
              >
                <source src={file.image} type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            )}
            <div
              onClick={() => handleRemoveFile(index)}
              className={styles.BoxImg__boxSvg}
            >
              <img
                className={styles.BoxImg__CrossBalck}
                src={crossblack}
                alt="Удалить"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}