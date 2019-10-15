import React, {useState} from 'react';
import './Table.css';
import HeaderRow from '../headerRow/HeaderRow'
import TableRow from '../tableRow/TableRow'
import {Column, DataRow} from "../../model/table-model";
import {formatTimeValue} from "../../shared/utils";

const Table = ({data, columns, onDataChange}: { data: DataRow[], columns: Column[], onDataChange?:Function }) => {

    const handleTextInput = (event, column: Column, index: number) => {
        const fieldValue = event.target.value;

        switch (column.valueKey) {
            case 'startTime':
                data[index].startTime = formatTimeValue(fieldValue);
                break;
            case 'endTime':
                data[index].endTime = formatTimeValue(fieldValue);
                data[index + 1].startTime = data[index].endTime;
                break;
            case 'issue':
                data[index].issue = fieldValue;
                break;
            case 'comment':
                data[index].comment = fieldValue;
        }
        onDataChange(data);
    };

    return (
        <div>
            <HeaderRow columns={columns}/>
            <div>
                {data.map((row, index) => <TableRow key={index} dataIndex={index} row={row} columns={columns}
                                                           data={data} handler={handleTextInput}/>)}
            </div>
        </div>
    )
};

export default Table;