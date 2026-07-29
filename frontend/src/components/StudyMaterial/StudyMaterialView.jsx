import { useState } from 'react';
import FlashcardList from '../Flashcard/FlashcardList';
import Quiz from '../Quiz/Quiz';
import ScoreCard from '../ScoreCard/ScoreCard';
import styles from './StudyMaterialView.module.css';

export default function StudyMaterialView({ data, onRestart, lastInput }) {
  const [activeTab, setActiveTab] = useState('flashcards'); // 'flashcards' | 'quiz' | 'source'
  const [quizState, setQuizState] = useState('playing'); // 'playing' | 'score'
  const [quizData, setQuizData] = useState(data.quiz);
  const [scoreData, setScoreData] = useState(null);

  const handleFlashcardsFinish = () => {
    setActiveTab('quiz');
  };

  const handleQuizComplete = (result) => {
    setScoreData(result);
    setQuizState('score');
  };

  const handleRetryWrong = () => {
    setQuizData(scoreData.wrongAnswers);
    setQuizState('playing');
  };

  const handleRestartQuiz = () => {
    setQuizData(data.quiz);
    setQuizState('playing');
    setScoreData(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabBar}>
        <button 
          className={styles.tab}
          onClick={onRestart}
          style={{ backgroundColor: 'var(--error-color)', color: '#FFF' }}
        >
          + New Topic
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'flashcards' ? styles.active : ''}`}
          onClick={() => setActiveTab('flashcards')}
        >
          Flashcards
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'quiz' ? styles.active : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          Quiz
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'source' ? styles.active : ''}`}
          onClick={() => setActiveTab('source')}
        >
          Original Notes
        </button>
      </div>

      <div className={styles.contentArea}>
        {activeTab === 'flashcards' && (
          <FlashcardList 
            flashcards={data.flashcards} 
            onFinish={handleFlashcardsFinish} 
          />
        )}

        {activeTab === 'quiz' && (
          <>
            {quizState === 'playing' ? (
              <Quiz 
                quizData={quizData} 
                onComplete={handleQuizComplete} 
              />
            ) : (
              <ScoreCard 
                score={scoreData.score} 
                total={scoreData.total} 
                wrongAnswersCount={scoreData.wrongAnswers.length}
                onRetryWrong={handleRetryWrong}
                onRestart={onRestart}
                onRetakeQuiz={handleRestartQuiz}
              />
            )}
          </>
        )}

        {activeTab === 'source' && (
          <div className={styles.sourceContainer}>
            <h2 className={styles.sourceTitle}>Your Original Notes</h2>
            <div className={styles.sourceContent}>
              {lastInput}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
