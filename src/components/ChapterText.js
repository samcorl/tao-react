import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import TaoText from '../tao';

function ChapterText(props) {
	let linesArray = TaoText[props.chapter-1];
	let textLines = linesArray.map((line) => line);
	let formattedText = textLines.map((line) => 
		<Typography variant="body1" component="div" gutterBottom>{line}</Typography>
	);
	return (
		TaoText[props.chapter-1].map(
			(line) => <Typography variant="body1" component="div" gutterBottom>{line}</Typography>
		)
	);
}

export default ChapterText;
