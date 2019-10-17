import React from 'react';
import {Timesheet} from '../../../../backend/src/shared/types';
import {SummaryView} from './summary-view/SummaryView';
import {InvalidEntries} from './invalid-entries/InvalidEntries';
import './Summary.css'

export const Summary = ({timesheet, closeModal}: { timesheet: Timesheet, closeModal: Function }) => {
    const isValid = timesheet.timesheetEntries.length && timesheet.timesheetEntries.every(({comment, company, endTime, startTime}) => !!(comment && company && endTime && startTime));

    return (
        <div className='summary-container'>
            <div className='summary-header'>
                <div>Review Summary</div>
                <i className="material-icons summary-close" onClick={() => closeModal()}>close</i>
            </div>
            {!isValid ?
                <InvalidEntries closeModal={closeModal}/>
                : <SummaryView closeModal={closeModal} timesheetEntries={timesheet.timesheetEntries}/>}

        </div>
    )
};

