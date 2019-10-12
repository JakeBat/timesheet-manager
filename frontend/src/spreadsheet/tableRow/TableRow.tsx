import React from 'react';
import './TableRow.css';
import TableCell from '../tableCell/TableCell'

const tableRow = ({data}) => {
    return (
        <div className="table-row">
            {Object.keys(data).map(key => <TableCell content={data[key]}/>)}
        </div>
    )
};

export default tableRow;