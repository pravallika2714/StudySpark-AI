import { useState, useEffect } from 'react';
import { BookOpen, Moon, Sun } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <BookOpen className={styles.icon} />
        <span>StudySpark AI</span>
      </div>
      <button 
        className={styles.themeToggle} 
        onClick={() => setIsDark(!isDark)}
        aria-label="Toggle Dark Mode"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </nav>
  );
}
