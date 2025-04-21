import styles from './index.module.scss';
import ConsentBox from './ui/ConsentBox';
import ContainerDateSendler from './ui/ContainerDateSendler';
import TitleSendler from './ui/TitleSendler';

export default function SendlerInformation() {
  return (
    <div className={styles.sendlerInformation}>
        <TitleSendler className={styles.sendlerInformation__title}/>
        <ContainerDateSendler className={styles.sendlerInformation__container}/>
        <ConsentBox/>
    </div>
  )
}
