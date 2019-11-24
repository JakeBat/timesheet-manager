import {Column} from "./model/table-model";

export const timesheetColumns: Column[] = [
    {title: 'Company', input: 'select', valueKey: 'company'},
    {title: 'Start Time', input: 'text', valueKey: 'startTime'},
    {title: 'End Time', input: 'text', valueKey: 'endTime'},
    {title: 'Issue', input: 'text', valueKey: 'issue'},
    {title: 'Comment', input: 'text', valueKey: 'comment'},
    {title: 'Time Spent', input: 'none', valueKey: 'timeSpent'},
    {title: 'Issue Total', input: 'none', valueKey: 'issueTotal'},
    {title: 'Day Total', input: 'none', valueKey: 'dayTotal'}
];

export const summaryColumns: Column[] = [
    {title: 'Company', valueKey: 'company'},
    {title: 'Issue', valueKey: 'issue'},
    {title: 'Time', valueKey: 'time'},
    {title: 'Comments', valueKey: 'comments'},
];

export const signUpConfig = {
    header: 'Welcome to Timesheet',
    hideAllDefaults: true,
    defaultCountryCode: '1',
    signUpFields: [
        {
            label: 'Email',
            key: 'email',
            required: true,
            displayOrder: 1,
            type: 'string'
        },
        {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 2,
            type: 'password'
        }
    ]
};