import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ChapterMenuItems from './ChapterMenuItems'
import styles from './ChapterSelector.module.css';

function ChapterSelector(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
   };
  const handleClose = () => {
    setAnchorEl(null);
  };

	return(
		<div className={styles.selector}>
	      <Button
	        id="basic-button"
	        aria-controls={open ? 'basic-menu' : undefined}
	        aria-haspopup="true"
	        aria-expanded={open ? 'true' : undefined}
	        onClick={handleClick}
			className={styles.selectorButton}
			sx={{'background-color': '#ffffff', 'padding': '20px'}}
	      >
	        Choose a Chapter
	      </Button>
	      <Menu
	        id="basic-menu"
	        anchorEl={anchorEl}
	        open={open}
	        onClose={handleClose}
			onClick={handleClose}
	        MenuListProps={{
	          'aria-labelledby': 'basic-button',
	        }}
	      >
	        <ChapterMenuItems updateChapter={props.updateChapter} />
	      </Menu>
		</div>	
		);
}

export default ChapterSelector;
