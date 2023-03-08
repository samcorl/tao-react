import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ChapterViewer from './chapter-viewer.js';
import Typography from '@mui/material/Typography';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

class App extends React.Component {
	render() {
		return(
			<React.Fragment>
      			<CssBaseline />
      			<Container maxWidth="sm">
        			<Box sx={{ bgcolor: '#333333', height: '100vh', padding: '20px' }}>
        				<Typography variant="h2" component="div" gutterBottom sx={{ color: '#CCCCCC' }}>
          					Tao Te Ching
        				</Typography>
        				<ChapterViewer />
        			</Box>
      			</Container>
    		</React.Fragment>
		);
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('root')
);
