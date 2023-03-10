import React, { useState } from 'react';
import ChapterSelector from "./ChapterSelector";
import ChapterText from "./ChapterText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function ChapterViewer(props) {
    const [chapter, updateChapter] = useState(1);

    return (
        <div>
            <ChapterSelector updateChapter={updateChapter}/>
            <Card sx={{ minWidth: 475 }}>
                <CardContent>
                    <Typography className="chapter-number" variant="h3" component="div" gutterBottom>
                        {chapter}
                    </Typography>
                    <ChapterText chapter={chapter}/>
               </CardContent>
            </Card>
        </div>
    );
}
export default ChapterViewer;