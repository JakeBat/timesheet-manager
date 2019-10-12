import React from 'react';
import './HeaderRow.css';
import HeaderCell from '../headerCell/HeaderCell'

const headers = ['Start Time', 'End Time', 'Issue', 'Comment', 'Time Spent', 'Issue Total', 'Day Total'];

const headerRow = (props) => {
    return(
        <div className='header-row'>
            {headers.map(header => (<HeaderCell title={header}/>))}
        </div>
    )
};

export default headerRow;
