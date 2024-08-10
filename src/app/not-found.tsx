import React from 'react';
import styles from '../styles/NotFound.module.css'; // Подключаем стили

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default NotFound;
