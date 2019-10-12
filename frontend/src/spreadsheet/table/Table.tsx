import React from 'react';
import './Table.css';
import HeaderRow from '../headerRow/HeaderRow'
import TableRow from '../tableRow/TableRow'

const table = ({data, columns}:{data: DataRow[], columns: Column[]}) => {
    return (
        <div>
            <HeaderRow/>
            <div>
                {data.map(row => <TableRow data={row}/>)}
            </div>
        </div>
    )
};

export default table;

export interface DataRow {
    startTime: string;
    endTime: string;
    issue: string;
    comment: string;
    timeSpent: string;
    issueTotal: string;
    dayTotal: string;
}

export interface Column {
    title: string,
    isEditable: boolean

}