import React from 'react';
import { Timesheet, TimesheetEntries } from '../../../backend/src/shared/types';
import { Button, Input } from '../shared';
import { groupBy } from 'lodash';
import { Column, DataRow } from '../model/table-model';
import Table from '../spreadsheet/table/Table';
import { convertToTimeSpentMinutes, convertToHoursAndMinutes } from '../shared/utils/time-utils';
import { Credentials } from './Credentials';
import { SummaryView } from './SummaryView';
import { InvalidEntries } from './InvalidEntries';

export const SummaryModal = ({timesheet, closeModal}:{timesheet:Timesheet, closeModal:Function}) => {
    const isValid = timesheet.timesheetEntries.length && timesheet.timesheetEntries.every(({comment, company, endTime, startTime}) => !!(comment && company && endTime && startTime));

    return (
        <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'32px', flex:'0 0 auto', background:'#5d2061', color:'white', padding:'20px'}}>
                <div>Review Summary</div>
                <i onClick={() => closeModal()} style={{cursor:'pointer', fontSize:'32px'}} className="material-icons">close</i>
            </div>
            {!isValid ?
            <InvalidEntries closeModal={closeModal}/>
            : <SummaryView closeModal={closeModal} timesheetEntries={timesheet.timesheetEntries}/>  }

        </div>
    )
}

