export interface Insight {
    personId?:string,
    insightId?:string,
    blurb?:string,
    tags?:string[],
    dateRecorded?:number,
    reference?:string,
    link?:string,
    newTags?:string[],
    rating?:string
}

export interface DynamoInsight extends Insight {

    pk?:string, //personId
    sk?:string, //v0 + dateRecorded + tag
    gsi1Pk?:string, //personId
    gsi1Sk?:string, //tag
    gsi2Pk?:string, //personId
    gsi2Sk?:string, //references
    deleteTags?:string[]
}