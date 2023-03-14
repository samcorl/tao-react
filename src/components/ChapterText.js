import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import TaoText from '../tao';

function ChapterText(props) {
	let lines = TaoText[props.chapter-1].map(
		(line) => <Typography variant="body1" component="div" gutterBottom className="chapter-text">{line}</Typography>
	);
	return (
		<div className="chapter-text-lines">
			{lines}
		</div>
	);
}

export default ChapterText;
