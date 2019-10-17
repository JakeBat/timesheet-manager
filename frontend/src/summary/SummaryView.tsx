import React from 'react';
import { Timesheet, TimesheetEntries } from '../../../backend/src/shared/types';
import { Button, Input } from '../shared';
import { Column, DataRow } from '../model/table-model';
import Table from '../spreadsheet/table/Table';
import { Credentials } from './Credentials';
import { SummaryEntries } from './SummaryEntries';
import { groupBy } from 'lodash';
import {convertToTimeSpentMinutes, convertToHoursAndMinutes } from '../shared/utils/time-utils';
const getBasicAuthHeader = (username, password) => ({headers:{'Authorization': 'Basic ' + btoa(username + ':' + password), 'Content-Type':'application/json'}})
const columns: Column[] = [
    {title: 'Company', valueKey:'company'},
    {title: 'Issue', valueKey:'issue'},
    {title: 'Time', valueKey:'time'},
    {title: 'Comments', valueKey:'comments'},
];
const compileSummay = (entries:TimesheetEntries[]) => {

    const entriesByIssue = groupBy(entries, 'issue');
    const issues = Object.keys(entriesByIssue);
    return issues.map((issue) => {
        const [{startTime, endTime, comment, company} , ...issueEntries] = entriesByIssue[issue]
        const startingEntry = {time:convertToTimeSpentMinutes(startTime, endTime), comments:comment || '', company, issue}
        return issueEntries.reduce<SummaryEntries>(({time, comments, ...acc}, {comment, startTime, endTime}) => {
            const timeSpent = convertToTimeSpentMinutes(startTime, endTime)
            return {...acc, comments: `${comments} / ${comment || ''}`, time: time + timeSpent}
        }, startingEntry)
    }).map(({time, ...entry}) => ({time:convertToHoursAndMinutes(time), ...entry}));

}

//TODO: fix data accept any array
export const SummaryView = ({timesheetEntries, closeModal}:{timesheetEntries:TimesheetEntries[], closeModal:Function}) => {
            let avUsername = '';
            let avPassword = '';
            let tmUsername = '';
            let tmPassword = '';
            const summaryEntries:any = compileSummay(timesheetEntries);
            return (
                <>
                    <div style={{flex:'1 1 0px', padding:'10px'}}>
                        <Table data={summaryEntries} columns={columns}/>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-around', marginBottom:'10px'}}>
                        <Credentials company="Aviata Credentials" userOnChange={({target}) => avUsername = target.value} passOnChange={({target}) => avPassword = target.value}/>
                        <Credentials company="TA Credentials" userOnChange={({target}) => tmUsername = target.value} passOnChange={({target}) => tmPassword = target.value}/>
                    </div>
                    <div style={{display:'flex', justifyContent:'center', flex:'0 0 auto'}}>
                        <Button text="Post Times" fontSize='24px' onClick={() => {
                            const logsByType = groupBy(summaryEntries,'company');
                            sendJiraRequests('https://aviatainc.atlassian.net/rest/api/2/issue', avUsername, avPassword, logsByType.AV)
                            sendJiraRequests('https://jira.truste.com/rest/api/2/issue', tmUsername, tmPassword, logsByType.TM)

                            closeModal();
                        }}/>
                    </div>
                </>
    )
}

const sendJiraRequests = (baseUrl, username, password, logs) =>{
    return logs.map(({comments, time, issue}) => {
        //TODO: old includes started do we need to?
     return fetch(`${baseUrl}/${issue}/worklogs`, {...getBasicAuthHeader(username, password), body:JSON.stringify({comments, timeSpent:time})})
    })
}