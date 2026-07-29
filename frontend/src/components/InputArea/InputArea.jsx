import { useState } from 'react';
import styles from './InputArea.module.css';

export default function InputArea({ onGenerate, isLoading }) {
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (notes.trim() && !isLoading) {
      onGenerate(notes);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        placeholder="Paste your notes, textbook content, or documentation here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        disabled={isLoading}
      />
      <button 
        type="submit" 
        className={styles.button}
        disabled={isLoading || !notes.trim()}
      >
        {isLoading ? 'Generating...' : 'Generate Study Material'}
      </button>
    </form>
  );
}
