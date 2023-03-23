import React, { useState } from 'react';
import ChapterSelector from "./ChapterSelector";
import ChapterText from "./ChapterText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from './ChapterViewer.module.css';

function ChapterViewer(props) {
    const [chapter, updateChapter] = useState(Math.floor(Math.random() * 82));

    return (
        <div>
            <ChapterSelector updateChapter={updateChapter}/>
            <Card sx={{ minWidth: 475 }}>
                <CardContent>
                    <Typography className={styles.number} variant="h3" component="div" gutterBottom>
                        {chapter}
                    </Typography>
                    <ChapterText chapter={chapter}/>
               </CardContent>
            </Card>
        </div>
    );
}
export default ChapterViewer;