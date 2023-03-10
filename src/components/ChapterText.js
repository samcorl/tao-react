import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import TaoText from '../tao';

function ChapterText(props) {
	return (
		TaoText[props.chapter-1].map(
			(line) => <Typography variant="body1" component="div" gutterBottom className="chapter-text">{line}</Typography>
		)
	);
}

export default ChapterText;
