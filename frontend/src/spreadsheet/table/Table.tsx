import React from 'react';
import './Table.css';
import HeaderRow from '../headerRow/HeaderRow'
import TableRow from '../tableRow/TableRow'
import {Column, DataRow} from "../../model/table-model";

const table = ({data, columns}: { data: DataRow[], columns: Column[] }) => {
    return (
        <div>
            <HeaderRow columns={columns}/>
            <div>
                {data.map(row => <TableRow row={row} columns={columns}/>)}
            </div>
        </div>
    )
};

export default table;