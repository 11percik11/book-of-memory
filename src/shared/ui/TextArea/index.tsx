import Title from '../Title';
import styles from './index.module.scss';

interface TextAreaProps {
    title?: string;
    necessarilySvg?: boolean;
    placeholder?: string;
    className?: string;
}

export default function TextArea({title, necessarilySvg = false, placeholder, className}: TextAreaProps) {
  return (
    <div className={`${styles.containerTextArea} ${className}`}>
        {title ? <Title text={title} necessarilySvg={necessarilySvg}/> : <></>}
        <div className={styles.containerTextArea__BoxTextarea}>
          <textarea placeholder={placeholder} className={styles.containerTextArea__textarea}></textarea>
        </div>
    </div>
  )
}
