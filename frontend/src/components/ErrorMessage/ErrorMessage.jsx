import { CircleX, RotateCcw } from 'lucide-react';
import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className={styles.container}>
      <CircleX className={styles.icon} />
      <h3 className={styles.title}>Oops! Something went wrong.</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          <RotateCcw className={styles.retryIcon} />
          Try Again
        </button>
      )}
    </div>
  );
}
