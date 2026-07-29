import styles from './Hero.module.css';

export default function Hero() {
  return (
    <header className={styles.hero}>
      <h1 className={styles.title}>StudySpark AI</h1>
      <p className={styles.subtitle}>
        Transform your notes into flashcards and quizzes in seconds.
      </p>
    </header>
  );
}
