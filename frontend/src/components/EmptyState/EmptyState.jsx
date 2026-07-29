import { Brain } from 'lucide-react';
import styles from './EmptyState.module.css';

export default function EmptyState() {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <Brain className={styles.icon} />
      </div>
      <p className={styles.message}>Paste your notes to begin learning.</p>
    </div>
  );
}
