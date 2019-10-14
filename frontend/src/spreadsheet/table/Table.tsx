import React, {useState} from 'react';
import './Table.css';
import HeaderRow from '../headerRow/HeaderRow'
import TableRow from '../tableRow/TableRow'
import {Column, DataRow} from "../../model/table-model";
import {formatTimeValue} from "../../shared/utils";

const Table = ({data, columns}: { data: DataRow[], columns: Column[] }) => {
    const [currentData, setCurrentData] = useState(data);

    const handleTextInput = (event, column: Column, index: number) => {
        const fieldValue = event.target.value;

        switch (column.valueKey) {
            case 'startTime':
                currentData[index].startTime = formatTimeValue(fieldValue);
                break;
            case 'endTime':
                currentData[index].endTime = formatTimeValue(fieldValue);
                currentData[index + 1].startTime = currentData[index].endTime;
                break;
            case 'issue':
                currentData[index].issue = fieldValue;
                break;
            case 'comment':
                currentData[index].comment = fieldValue;
        }
        console.log(currentData);
        setCurrentData([...currentData]);
    };

    return (
        <div>
            <HeaderRow columns={columns}/>
            <div>
                {currentData.map((row, index) => <TableRow key={index} dataIndex={index} row={row} columns={columns}
                                                           data={currentData} handler={handleTextInput}/>)}
            </div>
        </div>
    )
};

export default Table;