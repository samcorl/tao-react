import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ChapterMenuItems from './ChapterMenuItems'

function ChapterSelector(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
   };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

	return(
		<div>
	      <Button
	        id="basic-button"
	        aria-controls={open ? 'basic-menu' : undefined}
	        aria-haspopup="true"
	        aria-expanded={open ? 'true' : undefined}
	        onClick={handleClick}
			className="chapter-selector"
	      >
	        Choose a Chapter
	      </Button>
	      <Menu
	        id="basic-menu"
	        anchorEl={anchorEl}
	        open={open}
	        onClose={handleClose}
	        MenuListProps={{
	          'aria-labelledby': 'basic-button',
	        }}
	      >
	        <ChapterMenuItems updateChapter={props.updateChapter}/>
	      </Menu>
		</div>	
		);
}

export default ChapterSelector;
