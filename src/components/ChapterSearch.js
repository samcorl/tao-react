import React, { useMemo, useState, useCallback } from 'react';
import { AutoComplete } from '@progress/kendo-react-dropdowns';
import TaoText from '../tao';
import styles from './ChapterSearch.module.css';

const ChapterSearch = React.memo(({ onChapterSelect, currentChapter }) => {
  const [searchValue, setSearchValue] = useState('');
  const [originalSearchTerm, setOriginalSearchTerm] = useState('');

  // Generate searchable data with chapter previews
  const searchData = useMemo(() => {
    return TaoText.map((chapter, index) => {
      const chapterNum = index + 1;
      const firstLine = Array.isArray(chapter) && chapter.length > 0 ? chapter[0] : '';
      const preview = firstLine.length > 80 ? firstLine.substring(0, 80) + '...' : firstLine;
      
      // Include all text from the chapter for searching
      const allText = Array.isArray(chapter) ? chapter.join(' ') : '';
      
      return {
        value: chapterNum,
        text: `Chapter ${chapterNum}`,
        preview: preview,
        searchText: `${chapterNum} ${allText}`.toLowerCase()
      };
    });
  }, []);

  // Filter data based on search input
  const filteredData = useMemo(() => {
    if (!searchValue) return searchData.slice(0, 10); // Show first 10 by default
    
    const searchTerm = searchValue.toLowerCase();
    return searchData.filter(item => 
      item.searchText.includes(searchTerm) ||
      item.text.toLowerCase().includes(searchTerm)
    ).slice(0, 20); // Limit to 20 results
  }, [searchData, searchValue]);

  const handleChange = useCallback((event) => {
    const value = event.target.value || '';
    setSearchValue(value);
    
    // Store the original search term (before it gets replaced by "Chapter X")
    if (value && !value.startsWith('Chapter ')) {
      setOriginalSearchTerm(value);
    }
    
    // Check if the value matches a chapter format (e.g., "Chapter 23")
    const chapterMatch = value.match(/^Chapter (\d+)$/);
    if (chapterMatch && typeof onChapterSelect === 'function') {
      const chapterNum = parseInt(chapterMatch[1], 10);
      console.log('Chapter selected via text input:', chapterNum, 'from original search term:', originalSearchTerm);
      // Use the original search term for highlighting
      onChapterSelect(chapterNum, originalSearchTerm);
      setSearchValue(''); // Clear after selection
      setOriginalSearchTerm(''); // Clear original term
    }
  }, [onChapterSelect, originalSearchTerm]);

  const handleSelectionChange = useCallback((event) => {
    const selectedItem = event.target.value;
    console.log('Search selection:', selectedItem); // Debug log
    if (selectedItem && selectedItem.value && typeof onChapterSelect === 'function') {
      // Pass both chapter number and search term for highlighting
      console.log('Calling onChapterSelect with:', selectedItem.value, searchValue); // Debug log
      onChapterSelect(selectedItem.value, searchValue);
      setSearchValue(''); // Clear search after selection
    }
  }, [onChapterSelect, searchValue]);

  const itemRender = (li, itemProps) => {
    const dataItem = itemProps.dataItem;
    return React.cloneElement(li, li.props, 
      <div className={styles.searchItem}>
        <div className={styles.chapterTitle}>{dataItem.text}</div>
        {dataItem.preview && (
          <div className={styles.chapterPreview}>{dataItem.preview}</div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.searchContainer}>
      <label htmlFor="chapter-search" className={styles.label}>
        Search Chapters:
      </label>
      <AutoComplete
        id="chapter-search"
        data={filteredData}
        textField="text"
        value={searchValue}
        onChange={handleChange}
        onSelectionChange={handleSelectionChange}
        itemRender={itemRender}
        placeholder="Search by chapter number or text..."
        className={styles.autocomplete}
        size="large"
        fillMode="outline"
        aria-label="Search chapters by number or content"
        clearButton={true}
      />
    </div>
  );
});

ChapterSearch.displayName = 'ChapterSearch';

export default ChapterSearch;
