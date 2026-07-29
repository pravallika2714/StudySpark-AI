import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import styles from './Flashcard.module.css';

export default function FlashcardList({ flashcards, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!flashcards || flashcards.length === 0) return null;

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    // Add small timeout for animation to reset before changing content
    setTimeout(() => {
      setCurrentIndex((prev) => Math.min(prev + 1, flashcards.length - 1));
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }, 150);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input somewhere else
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (e.key === ' ') {
          setIsFlipped(prev => !prev);
        } else if (currentIndex < flashcards.length - 1) {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          handlePrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, flashcards.length, isFlipped]);

  return (
    <div className={styles.container}>
      <div className={styles.progressContainer}>
        <span className={styles.progressText}>
          Card {currentIndex + 1} of {flashcards.length}
        </span>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
          />
        </div>
      </div>

      <div 
        className={`${styles.flashcard} ${isFlipped ? styles.flipped : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={styles.cardInner}>
          <div className={styles.cardFront}>
            <span className={styles.label}>Question</span>
            <p className={styles.content}>{currentCard.question}</p>
            <span className={styles.hint}>Click to flip</span>
          </div>
          <div className={styles.cardBack}>
             <span className={styles.label}>Answer</span>
            <p className={styles.content}>{currentCard.answer}</p>
             <span className={styles.hint}>Click to flip back</span>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className={styles.iconBtn}
        >
          <ChevronLeft /> Previous
        </button>
        
        {currentIndex < flashcards.length - 1 ? (
          <button 
            onClick={handleNext} 
            className={styles.iconBtn}
          >
            Next <ChevronRight />
          </button>
        ) : (
          <button onClick={onFinish} className={styles.finishBtn}>
            Start Quiz
          </button>
        )}
      </div>
    </div>
  );
}
