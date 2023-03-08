import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function ChapterMenuItems(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = (event) => {
	props.updateChapter(event.target.innerText);
    setAnchorEl(null);
  };
  let items = [];
  for (let i = 1; i < 82; i++) {
    items.push(<MenuItem onClick={handleClose} key={i}>{i}</MenuItem>);
  }
  return <div>{items}</div>;
}

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
