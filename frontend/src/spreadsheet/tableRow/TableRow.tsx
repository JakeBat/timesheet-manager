import React from 'react';
import './TableRow.css';
import TableCell from '../tableCell/TableCell'
import {Column, DataRow} from "../../model/table-model";

const formatMap = new Map([
    ['hh:mm', '[0-1][0-9]:[0-5][0-9]'],
    ['h:mm', '[1-9]:[0-5][0-9]'],
    ['hhmm', '[0-1][0-9][0-5][0-9]'],
    ['hmm', '[1-9][0-5][0-9]'],
    ['hh', '[0-1][0-9]'],
    ['h', '[1-9]']
]);

const tableRow = ({row, columns}: { row: DataRow, columns: Column[] }) => {
    return (
        <div className="table-row">
            {columns.map(column => <TableCell column={column} content={row[column.valueKey]} handler={(event) => handleTextInput(event, row, column)}/>)}
        </div>
    )
};

export default tableRow;

const handleTextInput = (event, row, column) => {
    event.target.value = formatTimeValue(event.target.value);
};

const formatTimeValue = (value): string => {
    let formattedValue: string = '';
    formatMap.forEach((format, key) => {
        if (new RegExp(format).test(value)) {
            formattedValue = convertToHhMm(key, value)
        }
    });
    return formattedValue;
};

const convertToHhMm = (currentFormat, value): string => {
    switch (currentFormat) {
        case ('hh:mm'):
            return value;
        case ('h:mm'):
            return '0' + value;
        case ('hhmm'):
            return value.substring(0, 2) + ':' + value.substring(2);
        case ('hmm'):
            return '0' + value.substring(0, 1) + ':' + value.substring(1);
        case ('hh'):
            return value + ':00';
        case ('h'):
            return '0' + value + ':00';
        default:
            return '';
    }
};