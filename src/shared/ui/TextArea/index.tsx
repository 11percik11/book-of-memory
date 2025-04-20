import { useFormContext } from 'react-hook-form';
import Title from '../Title';
import styles from './index.module.scss';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
// function getNestedError(obj: any, path: string): FieldError | undefined {
//   return path.split('.').reduce((acc, part) => {
//     // Обработка массивов типа awards.0.year
//     const arrayMatch = part.match(/(\w+)\[(\d+)\]/);
//     if (arrayMatch) {
//       const arrayName = arrayMatch[1];
//       const arrayIndex = arrayMatch[2];
//       return acc && acc[arrayName] && acc[arrayName][arrayIndex];
//     }
//     return acc && acc[part];
//   }, obj);
// }

interface TextAreaProps {
    title?: string;
    necessarilySvg?: boolean;
    placeholder?: string;
    className?: string;
    name: string;
}

export default function TextArea({title, necessarilySvg = false, placeholder, className, name}: TextAreaProps) {

  const {
      register,
    } = useFormContext();


  return (
    <div className={`${styles.containerTextArea} ${className}`}>
        {title ? <Title text={title} necessarilySvg={necessarilySvg}/> : <></>}
        <div className={styles.containerTextArea__BoxTextarea}>
          <textarea {...register(name)} placeholder={placeholder} className={styles.containerTextArea__textarea}></textarea>
        </div>
    </div>
  )
}
