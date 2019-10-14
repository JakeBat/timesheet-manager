import React from 'react';
import './TableCell.css';
import {Column, DataRow} from '../../model/table-model';
import {getDayTotal, getIssueTotal} from "../../shared/utils";

const TableCell = ({dataIndex, column, content, data, handler}: { dataIndex: number, column: Column, content: string, data: DataRow[], handler }) => {
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
                <div className='table-cell' key={content}>
                    <input className='table-input' type='text' defaultValue={content} onBlur={handler}/>
                </div>
            );
            break;
        default:
            switch (column.valueKey) {
                case "issueTotal":
                    content = data[dataIndex].endTime != '' ? getIssueTotal(data, dataIndex) : '';
                    break;
                case "dayTotal":
                    content = data[dataIndex].endTime != '' ? getDayTotal(data, dataIndex) : '';
                    break;

            }
            cell = <div className='table-cell'>{content}</div>;
    }

    return cell
};

export default TableCell;
