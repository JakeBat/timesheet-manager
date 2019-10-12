import React from 'react';
import './HeaderRow.css';
import HeaderCell from '../headerCell/HeaderCell'
import {Column} from "../../model/table-model";


const headerRow = ({columns}: { columns: Column[] }) => {
    return (
        <div className='header-row'>
            {columns.map(column => (<HeaderCell title={column.title}/>))}
        </div>
    )
};

export default headerRow;
