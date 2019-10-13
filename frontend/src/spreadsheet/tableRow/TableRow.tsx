import React from 'react';
import './TableRow.css';
import TableCell from '../tableCell/TableCell'
import {Column, DataRow} from "../../model/table-model";

const TableRow = ({keyIndex, row, columns, handler}: {keyIndex: number, row: DataRow, columns: Column[], handler }) => {
    return (
        <div className="table-row">
            {columns.map((column, index) => <TableCell key={index} column={column} content={row[column.valueKey]} handler={(event) => handler(event, column, keyIndex)}/>)}
        </div>
    )
};

export default TableRow;