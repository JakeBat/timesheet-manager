export interface DataRow {
    company: 'TA' | 'AV';
    startTime: string;
    endTime: string;
    issue: string;
    comment: string;
    timeSpent: string;
}

export interface Column {
    title: string,
    input?: 'none' | 'text' | 'select';
    valueKey: string;
}