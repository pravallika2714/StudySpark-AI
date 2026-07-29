import { useState } from 'react';
import styles from './Quiz.module.css';

export default function Quiz({ quizData, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  if (!quizData || quizData.length === 0) return null;

  const currentQuestion = quizData[currentIndex];

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    setIsSubmitted(true);
    
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => [...prev, currentQuestion]);
    }
  };

  const handleNext = () => {
    setIsSubmitted(false);
    setSelectedOption(null);
    
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete({ score, total: quizData.length, wrongAnswers });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.progress}>Question {currentIndex + 1} of {quizData.length}</span>
        <span className={styles.score}>Score: {score}</span>
      </div>

      <div className={styles.card}>
        <h3 className={styles.question}>{currentQuestion.question}</h3>
        
        <div className={styles.optionsList}>
          {currentQuestion.options.map((option, index) => {
            let optionClass = styles.option;
            
            if (isSubmitted) {
              if (option === currentQuestion.correctAnswer) {
                optionClass = `${styles.option} ${styles.correct}`;
              } else if (option === selectedOption) {
                optionClass = `${styles.option} ${styles.incorrect}`;
              } else {
                optionClass = `${styles.option} ${styles.disabled}`;
              }
            } else if (selectedOption === option) {
              optionClass = `${styles.option} ${styles.selected}`;
            }

            return (
              <button
                key={index}
                className={optionClass}
                onClick={() => !isSubmitted && setSelectedOption(option)}
                disabled={isSubmitted}
              >
                {option}
              </button>
            );
          })}
        </div>

        {isSubmitted && (
          <div className={styles.feedback}>
            <p className={selectedOption === currentQuestion.correctAnswer ? styles.feedbackCorrect : styles.feedbackIncorrect}>
              {selectedOption === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
            </p>
            <p className={styles.explanation}>{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      <div className={styles.controls}>
        {!isSubmitted ? (
          <button 
            className={styles.submitBtn} 
            onClick={handleSubmit}
            disabled={!selectedOption}
          >
            Submit Answer
          </button>
        ) : (
          <button 
            className={styles.nextBtn} 
            onClick={handleNext}
          >
            {currentIndex < quizData.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        )}
      </div>
    </div>
  );
}
