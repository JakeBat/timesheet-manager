import React from 'react';
import './HeaderRow.css';
import HeaderCell from '../headerCell/HeaderCell'
import {Column} from "../../../model/table-model";


const HeaderRow = ({columns}: { columns: Column[] }) => {
    return (
        <div className='header-row'>
            {columns.map((column, index) => <HeaderCell key={index} title={column.title}/>)}
        </div>
    )
};

export default HeaderRow;
