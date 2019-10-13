import React from 'react';
import { Timesheet, TimesheetEntries } from '../../../backend/src/shared/types';
import { Button, post } from '../shared';
import { groupBy } from 'lodash'
interface SummaryEntries {
    company,
    issue,
    time,
    comments
}
const compileSummay = (entries:TimesheetEntries[]) => {
    const entriesByIssue = groupBy(entries, 'issue')
    Object.keys(entriesByIssue).map((issue) => {
        return entriesByIssue[issue].reduce<SummaryEntries>(({time, comments, ...acc}, {comment, startTime, endTime}) => {
            return {...acc, comments: `${comment} ${''}`, time}
        }, {time:0, comments:'', company:entriesByIssue[issue][0].company, issue})
    });
}
export const Summary = ({timesheet, closeModal}:{timesheet:Timesheet, closeModal:Function}) => {
    return (
        <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px', fontSize:'32px', flex:'0 0 auto'}}>
                <div>Review Summary</div>
                <div onClick={() => closeModal()} style={{cursor:'pointer'}}>X</div>
            </div>
            <div style={{flex:'1 1 0px'}}>
            Table Here
            </div>
            <div style={{display:'flex', justifyContent:'center', flex:'0 0 auto'}}>
                <Button text="Post Times" fontSize='24px' onClick={() => {

                    closeModal();
                }}/>
            </div>

        </div>
    )
}