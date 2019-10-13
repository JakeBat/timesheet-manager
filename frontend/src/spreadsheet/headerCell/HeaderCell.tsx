import React from 'react';
import './HeaderCell.css';

const HeaderCell = ({key, title}: {key: number, title: string}) => {
  return(
      <div className="header-cell">{title}</div>
  )
};

export default HeaderCell;

