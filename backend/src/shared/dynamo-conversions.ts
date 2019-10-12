import { DynamoInsight, Insight } from "./types";


export function dynamoInsightToInsight(insight:DynamoInsight):Insight {
    const [v, dateRecorded, uuid,tag] = insight.sk.split('_');
     return {
        personId:insight.pk,
        insightId:`${dateRecorded}_${uuid}`,
        dateRecorded: +dateRecorded,
        tags:insight.tags,
        blurb:insight.blurb,
        link:insight.link,
        reference:insight.gsi2Sk,
        rating:insight.rating
    }
}

export function insightToDynamoInsight(insight:Insight):DynamoInsight {
    return {
        pk:insight.personId,
        sk:`v0_${insight.insightId}`,
        blurb:insight.blurb,
        link:insight.link,
        tags:insight.newTags,
    }
}