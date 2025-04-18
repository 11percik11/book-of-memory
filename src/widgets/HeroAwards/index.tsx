import { useState } from 'react';
import TitleAwards from './ui/TitleAwards';
import ContainerDate from './ui/ContainerDate';
import styles from './index.module.scss';
import { Button } from '../../shared/ui';
import plus_svg from '../../shared/assets/svg/plus.svg';

export default function HeroAwards() {
  const [containers, setContainers] = useState([0]);

  const addContainer = () => {
    setContainers(prev => [...prev, Date.now()]);
  };

  const removeContainer = (id: number) => {
    setContainers(prev => prev.filter(item => item !== id));
  };

  return (
    <div className={styles.heroAwards}>
      <TitleAwards />
      
      {containers.map(id => (
        <ContainerDate 
          key={id}
          onRemove={() => removeContainer(id)}
        />
      ))}
      
      <Button 
        className={styles.heroAwards__button} 
        svg={plus_svg}
        onClick={addContainer}
      >
        ДОБАВИТЬ НАГРАДУ
      </Button>
    </div>
  );
}