import React, { useMemo } from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import styles from './ChapterSelector.module.css';

const ChapterSelector = React.memo(({ updateChapter, currentChapter }) => {
  // Generate chapter options
  const chapterOptions = useMemo(() => {
    return Array.from({ length: 81 }, (_, i) => ({
      value: i + 1,
      text: `Chapter ${i + 1}`
    }));
  }, []);

  // Find current selection
  const currentSelection = useMemo(() => {
    return chapterOptions.find(option => option.value === currentChapter) || chapterOptions[0];
  }, [chapterOptions, currentChapter]);

  const handleChange = (event) => {
    if (event.target.value && typeof updateChapter === 'function') {
      updateChapter(event.target.value.value);
    }
  };

  return (
    <div className={styles.selector}>
      <label htmlFor="chapter-selector" className={styles.label}>
        Select Chapter:
      </label>
      <DropDownList
        id="chapter-selector"
        data={chapterOptions}
        textField="text"
        dataItemKey="value"
        value={currentSelection}
        onChange={handleChange}
        className={styles.dropdown}
        size="large"
        fillMode="outline"
        aria-label="Select a chapter from the Tao Te Ching"
      />
    </div>
  );
});

ChapterSelector.displayName = 'ChapterSelector';

export default ChapterSelector;
