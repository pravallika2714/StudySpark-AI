import { Loader2 } from 'lucide-react';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.container}>
      <Loader2 className={styles.spinner} />
      <p className={styles.text}>Generating your study material...</p>
    </div>
  );
}
