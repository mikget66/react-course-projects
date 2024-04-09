import styles from './PageNotFound.module.css';

export default function PageNotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Page not found <p className={`${styles.emoji} ${styles.sadFace}`} role="img" aria-label="Sad face">😢</p>
      </h1>
    </div>
  );
}