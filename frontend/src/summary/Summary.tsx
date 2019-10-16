import React from 'react';
import { Timesheet, TimesheetEntries } from '../../../backend/src/shared/types';
import { Button, Input } from '../shared';
import { groupBy } from 'lodash';
import { Column, DataRow } from '../model/table-model';
import Table from '../spreadsheet/table/Table';
import {convertToTimeSpentMinutes, convertToHoursAndMinutes } from '../shared/utils/time-utils';
interface SummaryEntries {
    company,
    issue,
    time,
    comments
}
const compileSummay = (entries:TimesheetEntries[]) => {

    const entriesByIssue = groupBy(entries, 'issue');
    const issues = Object.keys(entriesByIssue);
    return issues.map((issue) => {
        const [{startTime, endTime, comment, company} , ...issueEntries] = entriesByIssue[issue]
        const startingEntry = {time:convertToTimeSpentMinutes(startTime, endTime), comments:comment, company, issue}
        return issueEntries.reduce<SummaryEntries>(({time, comments, ...acc}, {comment, startTime, endTime}) => {
            const timeSpent = convertToTimeSpentMinutes(startTime, endTime)
            return {...acc, comments: `${comments} / ${comment}`, time: time + timeSpent}
        }, startingEntry)
    }).map(({time, ...entry}) => ({time:convertToHoursAndMinutes(time), ...entry}));

}
const columns: Column[] = [
    {title: 'Company', valueKey:'company'},
    {title: 'Issue', valueKey:'issue'},
    {title: 'Time', valueKey:'time'},
    {title: 'Comments', valueKey:'comments'},
];
const getBasicAuthHeader = (username, password) => ({headers:{'Authorization': 'Basic ' + btoa(username + ':' + password), 'Content-Type':'application/json'}})
export const Summary = ({timesheet, closeModal}:{timesheet:Timesheet, closeModal:Function}) => {
    const summaryEntries:any = compileSummay(timesheet.timesheetEntries);
    let avUsername = '';
    let avPassword = '';
    let tmUsername = '';
    let tmPassword = '';
    return (
        <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px', fontSize:'32px', flex:'0 0 auto'}}>
                <div>Review Summary</div>
                <div onClick={() => closeModal()} style={{cursor:'pointer'}}>X</div>
            </div>
            <div style={{flex:'1 1 0px'}}>
                <Table data={summaryEntries} columns={columns}/>
            </div>
            <div style={{display:'flex', justifyContent:'space-around', marginBottom:'10px'}}>
                <div style={{display:'flex', flexDirection:'column', flex:'0 0 40%', fontSize:'18px', padding:'0px 15px', justifyContent:'center'}}>
                    <div style={{width:'100%', marginBottom:'10px', fontSize:'20px'}}>AtralWho'sWhatsIT</div>

                    <div style={{display:'flex', marginBottom:'5px'}}>
                        <div style={{fontWeight:600, flex:'0 0 100px'}}>Username:</div>
                        <input style={{flex:'1 1 0px'}} onChange={({target}) => avUsername = target.value}/>
                    </div>

                    <div style={{display:'flex', marginBottom:'5px'}}>
                        <div style={{fontWeight:600, flex:'0 0 100px'}}>Password:</div>
                        <input style={{flex:'1 1 0px'}} onChange={({target}) => avPassword = target.value}/>
                    </div>
                </div>
                <div style={{display:'flex', flexDirection:'column', flex:'0 0 40%', fontSize:'18px', padding:'0px 15px', justifyContent:'center'}}>
                    <div style={{width:'100%', marginBottom:'10px', fontSize:'20px'}}>SomeOTherCompany</div>

                    <div style={{display:'flex', marginBottom:'5px'}}>
                        <div style={{fontWeight:600, flex:'0 0 100px'}}>Username:</div>
                        <input style={{flex:'1 1 0px'}} onChange={({target}) => tmUsername = target.value}/>
                    </div>

                    <div style={{display:'flex', marginBottom:'5px'}}>
                        <div style={{fontWeight:600, flex:'0 0 100px'}}>Password:</div>
                        <input style={{flex:'1 1 0px'}} onChange={({target}) => tmUsername = target.value}/>
                    </div>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', flex:'0 0 auto'}}>
                <Button text="Post Times" fontSize='24px' onClick={() => {
                    const logsByType = groupBy(summaryEntries,'company');
                    sendJiraRequests('https://aviatainc.atlassian.net/rest/api/2/issue', avUsername, avPassword, logsByType.AV)
                    sendJiraRequests('https://jira.truste.com/rest/api/2/issue', tmUsername, tmPassword, logsByType.TM)

                    closeModal();
                }}/>
            </div>

        </div>
    )
}

const sendJiraRequests = (baseUrl, username, password, logs) =>{
    return logs.map(({comments, time, issue}) => {
        //TODO: old includes started do we need to?
     return fetch(`${baseUrl}/${issue}/worklogs`, {...getBasicAuthHeader(username, password), body:JSON.stringify({comments, timeSpent:time})})
    })
}