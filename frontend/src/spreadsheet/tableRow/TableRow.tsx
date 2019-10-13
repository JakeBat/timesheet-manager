import React from 'react';
import './TableRow.css';
import TableCell from '../tableCell/TableCell'
import {Column, DataRow} from "../../model/table-model";

const tableRow = ({data, columns}: { data: DataRow, columns: Column[] }) => {
    return (
        <div className="table-row">
            {Object.keys(data).map(key => <TableCell content={data[key]}/>)}
        </div>
    )
};

export default tableRow;