import React from 'react';
import {Button} from '../shared';

export const TimesheetButtons = ({addRow, postTime, openSummary}: { addRow: Function, postTime: Function, openSummary: Function }) => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
            <div>
                <Button text={'Add Row'} onClick={addRow}/>
                <Button text={'Clear Table'} onClick={() => console.log('Need To Implement')}/>
                <Button text={'View Summary'} fontSize="24px" onClick={openSummary}/>
                <Button text={'Verify Hours'} onClick={() => console.log('Need To Implement')}/>
                <Button text={'Save'} onClick={postTime}/>
            </div>
        </div>
    )
}