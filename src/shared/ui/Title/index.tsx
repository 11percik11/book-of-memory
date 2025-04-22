import { useState } from 'react';
import styles from './index.module.scss';
import cross from '../../../shared/assets/svg/cross.svg';
import sign_svg from '../../assets/svg/sign.svg';

interface TitleProps {
    necessarilySvg?: boolean;
    text?: string;
}

export default function Title({text, necessarilySvg}: TitleProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={styles.title}>
        {text}
        {necessarilySvg ? <img className={styles.title__crossSvg} src={cross} alt="*" /> : <></>}
        <div className={styles.title__tooltipContainer}>
          <img 
            className={styles.title__signSvg} 
            src={sign_svg} 
            alt=""
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <div className={styles.title__tooltip}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic optio saepe reiciendis voluptatum natus ab eius accusantium! Non vero, perferendis illo neque deserunt obcaecati sint cumque consectetur nihil optio. Sequi.
            </div>
          )}
        </div>
    </div>
  )
}