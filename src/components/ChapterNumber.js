import React from 'react';
import Typography from '@mui/material/Typography';
function ChapterNumber(props) {
	return (
		<Typography variant="h2" component="div" gutterBottom>
          	1 : {props.chapterNumber}
        </Typography>
	);
}
export default ChapterNumber;
