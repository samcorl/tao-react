import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import TaoText from '../tao';
import styles from './ChapterText.module.css';

function ChapterText(props) {
	let lines = TaoText[props.chapter-1].map(
		(line) => <Typography variant="body1" component="div" gutterBottom className={styles.text}>{line}</Typography>
	);
	return (
		<div className={styles.textLines}>
			{lines}
		</div>
	);
}

export default ChapterText;
