import React, {useState} from 'react';
import './Table.css';
import HeaderRow from '../headerRow/HeaderRow'
import TableRow from '../tableRow/TableRow'
import {Column, DataRow} from "../../model/table-model";
import {convertToHoursAndMinutes, convertToMinutes, convertToTimeSpent, formatTimeValue} from "../../shared/utils";

const ignoreTimeWords = ['break', 'lunch'];

const Table = ({data, columns}: { data: DataRow[], columns: Column[] }) => {
    const [currentData, setCurrentData] = useState(data);

    const handleTextInput = (event, column: Column, index: number) => {
        const fieldValue = event.target.value;

        switch (column.valueKey) {
            case 'startTime':
                currentData[index].startTime = formatTimeValue(fieldValue);
                event.target.value = currentData[index].startTime;
                if (!(currentData[index].endTime === '')) {
                    currentData[index].timeSpent = convertToTimeSpent(currentData[index].startTime, currentData[index].endTime)
                }
                break;
            case 'endTime':
                currentData[index].endTime = formatTimeValue(fieldValue);
                event.target.value = currentData[index].endTime;
                currentData[index + 1].startTime = currentData[index].endTime;
                if (!ignoreTimeWords.includes(currentData[index].issue.toLowerCase())) {
                    currentData[index].timeSpent = convertToTimeSpent(currentData[index].startTime, currentData[index].endTime);
                    currentData[index].issueTotal = getIssueTotal(currentData, index);
                    currentData[index].dayTotal = getDayTotal(currentData, index);
                }
                break;
            case 'issue':
                currentData[index].issue = fieldValue;
                currentData[index].issueTotal = getIssueTotal(currentData, index);
                if (ignoreTimeWords.includes(currentData[index].issue.toLowerCase())) {
                    currentData[index].timeSpent = '';
                    currentData[index].issueTotal = '';
                    currentData[index].dayTotal = '';
                }
        }
        setCurrentData([...currentData]);
    };

    return (
        <div>
            <HeaderRow columns={columns}/>
            <div>
                {currentData.map((row, index) => <TableRow keyIndex={index} row={row} columns={columns} handler={handleTextInput}/>)}
            </div>
        </div>
    )
};

 const getIssueTotal = (data, index) => {
     console.log('blah');
    let totalMinutes = 0;
    if (index == 0) {
        totalMinutes += convertToMinutes(data[0].timeSpent);
    } else {
        data.slice(0, index + 1).filter(row =>
            row.issue.toLowerCase() === data[index].issue.toLowerCase()
        ).forEach(row => {
            totalMinutes += convertToMinutes(row.timeSpent);
        });
    }
    return convertToHoursAndMinutes(totalMinutes);
};

const getDayTotal = (data, index) => {
    let totalMinutes = 0;
    if (index == 0) {
        totalMinutes += convertToMinutes(data[0].timeSpent);
    } else {
        data.slice(0, index + 1).forEach(row => {
            totalMinutes += convertToMinutes(row.timeSpent);
        });
    }
    return convertToHoursAndMinutes(totalMinutes);
};

export default Table;