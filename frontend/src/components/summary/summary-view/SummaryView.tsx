import React from 'react';
import {TimesheetEntries} from '../../../../../backend/src/shared/types';

import {groupBy} from 'lodash';
import {summaryColumns} from "../../../variables";
import {convertToHoursAndMinutes, convertToTimeSpentMinutes} from "../../../utils";
import Table from "../../shared/table/Table";
import {Button} from "../../shared/button";
import Credentials from "./credentials/Credentials";
import {SummaryEntries} from "../../../model/summary-model";

//TODO: fix data accept any array
export const SummaryView = ({timesheetEntries, closeModal}: { timesheetEntries: TimesheetEntries[], closeModal: Function }) => {
    let avUsername = '';
    let avPassword = '';
    let tmUsername = '';
    let tmPassword = '';
    const summaryEntries: any = compileSummay(timesheetEntries);
    return (
        <>
            <div className='summary-table'>
                <Table data={summaryEntries} columns={summaryColumns}/>
            </div>
            <div className='credentials'>
                <Credentials company="Aviata Credentials" userOnChange={({target}) => avUsername = target.value}
                             passOnChange={({target}) => avPassword = target.value}/>
                <Credentials company="TA Credentials" userOnChange={({target}) => tmUsername = target.value}
                             passOnChange={({target}) => tmPassword = target.value}/>
            </div>
            <div className='summary-buttons'>
                <Button text="Post Times" fontSize='24px' onClick={() => {
                    const logsByType = groupBy(summaryEntries, 'company');
                    sendJiraRequests('https://aviatainc.atlassian.net/rest/api/2/issue', avUsername, avPassword, logsByType.AV);
                    sendJiraRequests('https://jira.truste.com/rest/api/2/issue', tmUsername, tmPassword, logsByType.TM);
                    closeModal();
                }}/>
            </div>
        </>
    )
};

const compileSummay = (entries: TimesheetEntries[]) => {

    const entriesByIssue = groupBy(entries, 'issue');
    const issues = Object.keys(entriesByIssue);
    return issues.map((issue) => {
        const [{startTime, endTime, comment, company}, ...issueEntries] = entriesByIssue[issue];
        const startingEntry = {
            time: convertToTimeSpentMinutes(startTime, endTime),
            comments: comment || '',
            company,
            issue
        };
        return issueEntries.reduce<SummaryEntries>(({time, comments, ...acc}, {comment, startTime, endTime}) => {
            const timeSpent = convertToTimeSpentMinutes(startTime, endTime);
            return {...acc, comments: `${comments} / ${comment || ''}`, time: time + timeSpent}
        }, startingEntry)
    }).map(({time, ...entry}) => ({time: convertToHoursAndMinutes(time), ...entry}));

};

const getBasicAuthHeader = (username, password) => ({
    headers: {
        'Authorization': 'Basic ' + btoa(username + ':' + password),
        'Content-Type': 'application/json'
    }
});

const sendJiraRequests = (baseUrl, username, password, logs) => {
    return logs.map(({comments, time, issue}) => {
        //TODO: old includes started do we need to?
        return fetch(`${baseUrl}/${issue}/worklogs`, {
            ...getBasicAuthHeader(username, password),
            body: JSON.stringify({comments, timeSpent: time})
        })
    })
};