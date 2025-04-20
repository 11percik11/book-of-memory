import TitleAwards from './ui/TitleAwards';
import ContainerDate from './ui/ContainerDate';
import styles from './index.module.scss';
import { Button } from '../../shared/ui';
import plus_svg from '../../shared/assets/svg/plus.svg';

interface Fields {
  id: string;
  year: string;
  title: string;
}

interface HeroAwardsProps {
  fields: Fields[];
  onRemove: (id: number) => void;
  onAppend: (data: { year: string; title: string }) => void;
}

export default function HeroAwards({fields, onRemove, onAppend}: HeroAwardsProps) {

  const handleAppend = () => {
    onAppend({ year: '', title: '' });
  };

  return (
    <div className={styles.heroAwards}>
      <TitleAwards />
      
      {fields.map((field, index) => (
        <ContainerDate 
          key={field.id}
          onRemove={() => onRemove(index)}
          index={index}
        />
      ))}
      
      <Button 
        className={styles.heroAwards__button} 
        svg={plus_svg}
        onClick={handleAppend}
      >
        ДОБАВИТЬ НАГРАДУ
      </Button>
    </div>
  );
}