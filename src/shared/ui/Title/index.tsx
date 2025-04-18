import styles from './index.module.scss';
import cross from '../../../shared/assets/svg/cross.svg';

interface TitleProps {
    necessarilySvg?: boolean;
    text?: string;
}

export default function Title({text, necessarilySvg}: TitleProps) {
  return (
    <div className={styles.title}>
        {text}
        {necessarilySvg ? <img className={styles.title__Svg} src={cross} alt="*" /> : <></>}
    </div>
  )
}
