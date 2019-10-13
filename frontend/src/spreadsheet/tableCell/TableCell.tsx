import React from 'react';
import './TableCell.css';
import {Column} from '../../model/table-model';

const TableCell = ({key, column, content, handler}: {key: number, column: Column, content: string, handler}) => {
    let cell;

    switch (column.input) {
        case 'select':
            cell = (
                <select className='table-cell'>
                    <option value='AV'>AV</option>
                    <option value='TA'>TA</option>
                </select>
            );
            break;
        case 'text':
            cell = (
                <input className='table-cell' type='text' onBlur={handler}/>
            );
            break;
        default:
            cell = <div className='table-cell'>{content}</div>;
    }

    return cell
};

export default TableCell;
