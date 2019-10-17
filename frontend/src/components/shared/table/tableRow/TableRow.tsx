import React from 'react';
import './TableRow.css';
import TableCell from './tableCell/TableCell'
import {Column, DataRow} from "../../../model/table-model";

const TableRow = ({key, dataIndex, row, columns, data, handler}: { key: number, dataIndex: number, row: DataRow, columns: Column[], data: DataRow[], handler }) => {
    return (
        <div className="table-row">
            {columns.map((column, index) =>
                <TableCell
                    key={index}
                    dataIndex={dataIndex}
                    column={column}
                    content={row[column.valueKey]}
                    data={data}
                    handler={(event) => handler(event, column, dataIndex)}
                />)}
        </div>
    )
};

export default TableRow;