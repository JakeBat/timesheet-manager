export interface DataRow {
    startTime: string;
    endTime: string;
    issue: string;
    comment: string;
    timeSpent: string;
    issueTotal: string;
    dayTotal: string;
}

export interface Column {
    title: string,
    isEditable: boolean
}