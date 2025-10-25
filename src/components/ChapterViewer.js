import React, { useState, useEffect, useCallback } from 'react';
import ChapterSelector from "./ChapterSelector";
import ChapterSearch from "./ChapterSearch";
import ChapterText from "./ChapterText";
import { Card, CardBody } from '@progress/kendo-react-layout';
import styles from './ChapterViewer.module.css';

const ChapterViewer = React.memo(({ randomTrigger }) => {
    // Initialize chapter from localStorage or random
    const [chapter, setChapter] = useState(() => {
        const saved = localStorage.getItem('currentChapter');
        if (saved && !isNaN(saved) && saved >= 1 && saved <= 81) {
            return parseInt(saved, 10);
        }
        return Math.floor(Math.random() * 81) + 1;
    });
    
    const [highlightTerm, setHighlightTerm] = useState('');

    // Random chapter function
    const getRandomChapter = useCallback(() => {
        setChapter(prevChapter => {
            let newChapter;
            do {
                newChapter = Math.floor(Math.random() * 81) + 1;
            } while (newChapter === prevChapter); // Ensure we get a different chapter
            return newChapter;
        });
        setHighlightTerm(''); // Clear any highlights when going to random chapter
    }, []); // No dependencies - function is stable

    // Save current chapter to localStorage
    useEffect(() => {
        localStorage.setItem('currentChapter', chapter.toString());
    }, [chapter]);

    // Handle random chapter trigger from yin/yang button
    useEffect(() => {
        if (randomTrigger > 0) {
            getRandomChapter();
        }
    }, [randomTrigger, getRandomChapter]);

    // Chapter selection handler with validation
    const handleChapterChange = useCallback((newChapter, searchTerm = '') => {
        console.log('handleChapterChange called with:', newChapter, searchTerm); // Debug log
        const chapterNum = typeof newChapter === 'string' ? parseInt(newChapter, 10) : newChapter;
        if (!isNaN(chapterNum) && chapterNum >= 1 && chapterNum <= 81) {
            console.log('Setting chapter to:', chapterNum, 'with highlight:', searchTerm); // Debug log
            setChapter(chapterNum);
            setHighlightTerm(searchTerm);
        }
    }, []);

    return (
        <div className={styles.container}>
            <nav className={styles.controls} aria-label="Chapter navigation">
                <div className={styles.controlsTop}>
                    <ChapterSearch onChapterSelect={handleChapterChange} currentChapter={chapter} />
                </div>
                <ChapterSelector 
                    updateChapter={handleChapterChange} 
                    currentChapter={chapter}
                />
            </nav>
            
            <Card className={styles.chapterCard}>
                <CardBody>
                    <article 
                        className={styles.chapterContent}
                        aria-labelledby={`chapter-${chapter}-title`}
                    >
                        <header className={styles.chapterHeader}>
                            <h2 
                                id={`chapter-${chapter}-title`}
                                className={styles.chapterNumber}
                            >
                                Chapter {chapter}
                            </h2>
                        </header>
                        <ChapterText chapter={chapter} highlightTerm={highlightTerm} />
                    </article>
                </CardBody>
            </Card>
        </div>
    );
});

ChapterViewer.displayName = 'ChapterViewer';

export default ChapterViewer;