import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import styles from './app.module.scss';
import ConsentPage from '../pages/ConsentPage';

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/consent" element={<ConsentPage />} />
      </Routes>
    </div>
  )
}

export default App