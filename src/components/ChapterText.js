import React, { useMemo } from 'react';
import TaoText from '../tao';
import styles from './ChapterText.module.css';

const ChapterText = React.memo(({ chapter, highlightTerm }) => {
  // Function to highlight search terms
  const highlightText = (text, term) => {
    if (!term || !text) return text;
    
    // Escape special regex characters in the search term
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedTerm, 'gi');
    
    const result = [];
    let lastIndex = 0;
    let match;
    
    // Reset regex to ensure we start from the beginning
    regex.lastIndex = 0;
    
    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        result.push(text.slice(lastIndex, match.index));
      }
      
      // Add the highlighted match
      result.push(
        <mark key={match.index} className={styles.highlight}>
          {match[0]}
        </mark>
      );
      
      lastIndex = match.index + match[0].length;
      
      // Prevent infinite loop on zero-length matches
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }
    }
    
    // Add remaining text after the last match
    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex));
    }
    
    return result.length > 0 ? result : text;
  };

  const chapterContent = useMemo(() => {
    const chapterIndex = chapter - 1;
    
    // Validate chapter bounds
    if (chapterIndex < 0 || chapterIndex >= TaoText.length || !TaoText[chapterIndex]) {
      return null;
    }

    const chapterData = TaoText[chapterIndex];
    
    // Handle case where chapter data is not an array
    if (!Array.isArray(chapterData)) {
      return null;
    }

    return chapterData.map((line, index) => {
      // Handle empty lines as paragraph breaks
      if (!line || line.trim() === '') {
        return (
          <div 
            key={`empty-${index}`} 
            className={styles.paragraphBreak}
            aria-hidden="true"
          />
        );
      }

      return (
        <p 
          key={index}
          className={styles.line}
        >
          {highlightText(line, highlightTerm)}
        </p>
      );
    });
  }, [chapter, highlightTerm]);

  // Error state
  if (!chapterContent) {
    return (
      <div className={styles.errorContainer} role="alert">
        <p className={styles.errorText}>
          Chapter {chapter} not found. Please select a chapter between 1 and 81.
        </p>
      </div>
    );
  }

  return (
    <div 
      className={styles.textContainer}
      role="region"
      aria-labelledby={`chapter-${chapter}-title`}
    >
      <div className={styles.textContent}>
        {chapterContent}
      </div>
    </div>
  );
});

ChapterText.displayName = 'ChapterText';

export default ChapterText;
