export interface Timesheet {
    userId:string,
    date:string,
    timesheetEntries:TimesheetEntries[]
}

export interface TimesheetEntries {
    startTime:string,
    endTime:string,
    comment:string,
    issue:string,
    company: 'TA' | 'AV',
}