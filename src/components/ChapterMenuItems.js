import React from 'react';
import MenuItem from '@mui/material/MenuItem';

function ChapterMenuItems(props) {
     const updateChapter = (event) => {
      props.updateChapter(event.target.innerText);
     };
    let items = [];
    for (let i = 1; i < 82; i++) {
      items.push(<MenuItem onClick={updateChapter} key={i}>{i}</MenuItem>);
    }
    return <div>{items}</div>;
}
export default ChapterMenuItems
