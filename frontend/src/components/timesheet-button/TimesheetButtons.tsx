import React from 'react';
import {Button} from '../shared';

import './TimesheetButton.css'

export const TimesheetButtons = ({addRow, postTime, openSummary, clearTable}: { addRow: Function, postTime: Function, openSummary: Function, clearTable?: Function }) => {
    return (
        <div className='button-container'>
            <div>
                <Button text={'Add Row'} onClick={addRow}/>
                <Button text={'Clear Table'} onClick={clearTable}/>
                <Button text={'View Summary'} fontSize="24px" onClick={openSummary}/>
                <Button text={'Verify Hours'} onClick={() => console.log('Need To Implement')}/>
                <Button text={'Save'} onClick={postTime}/>
            </div>
        </div>
    )
};