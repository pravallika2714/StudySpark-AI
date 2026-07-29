import { GraduationCap, RotateCcw } from 'lucide-react';
import styles from './ScoreCard.module.css';

export default function ScoreCard({ score, total, onRetryWrong, onRestart, onRetakeQuiz, wrongAnswersCount }) {
  const percentage = Math.round((score / total) * 100);
  
  let message = '';
  if (percentage >= 90) message = 'Outstanding!';
  else if (percentage >= 70) message = 'Great job!';
  else if (percentage >= 50) message = 'Good effort!';
  else message = 'Keep practicing!';

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <GraduationCap className={styles.icon} />
      </div>
      
      <h2 className={styles.title}>{message}</h2>
      
      <div className={styles.scoreCircle}>
        <span className={styles.scoreText}>{score}</span>
        <span className={styles.totalText}>/ {total}</span>
      </div>
      
      <p className={styles.percentage}>{percentage}% Correct</p>

      <div className={styles.actions}>
        {wrongAnswersCount > 0 && (
          <button className={styles.retryBtn} onClick={onRetryWrong}>
            <RotateCcw className={styles.btnIcon} />
            Review {wrongAnswersCount} Wrong Answer{wrongAnswersCount > 1 ? 's' : ''}
          </button>
        )}
        <button className={styles.retryBtn} onClick={onRetakeQuiz} style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--text-primary)' }}>
          <RotateCcw className={styles.btnIcon} />
          Retake Full Quiz
        </button>
        <button className={styles.restartBtn} onClick={onRestart}>
          Start New Topic
        </button>
      </div>
    </div>
  );
}
