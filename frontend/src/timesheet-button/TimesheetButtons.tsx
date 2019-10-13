import React from 'react';
import { Button } from '../shared';
import { Timesheet } from '../../../backend/src/shared/types';

export const TimesheetButtons = ({openSummary}:{openSummary:Function}) => {
    return (
        <div style={{display:'flex', justifyContent:'center', marginTop:'15px'}}>
            <div>
                <Button text={'Clear Table'} onClick={()=>console.log('Need To Implement')}/>
                <Button text={'View Summary'} fontSize="24px" onClick={openSummary}/>
                <Button text={'Verify Hours'} onClick={()=>console.log('Need To Implement')}/>
            </div>
        </div>
    )
}