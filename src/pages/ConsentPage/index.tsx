import { Button } from '../../shared/ui';
import styles from './index.module.scss';
import arrow from '../../shared/assets/svg/arrow.svg';
import { useNavigate } from 'react-router-dom';
import { useGetPersonalDataAcceptQuery } from '../../entities/Hero/api/heroApi';

export default function ConsentPage() {
  const { data, isLoading, error } = useGetPersonalDataAcceptQuery();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  
  return (
    <div className={styles.consentPage}>
        <div className={styles.consentPage__boxTitel}>
            <Button onClick={() => navigate('/')} className={styles.consentPage__button} variant="red" svg={arrow}>НАЗАД</Button>
            <h2 className={styles.consentPage__title}>Согласие на обработку персональных данных</h2>
        </div>
        <p className={styles.consentPage__text}>
          <div dangerouslySetInnerHTML={{ __html: data?.description || '' }} />
        </p>
    </div>
  )
}
