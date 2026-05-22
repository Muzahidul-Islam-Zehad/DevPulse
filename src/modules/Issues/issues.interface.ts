export interface IIssues {
    title: string;
    description: string;
    type: string;
    status?: string;
}

export const IssuesTypes = {
    bug: "bug",
    feature_request: "feature_request",
} 

export type IssuesType = typeof IssuesTypes[keyof typeof IssuesTypes];

export const IssuesStatus = {
    open: "open",
    in_progress: "in_progress",
    resolved: "resolved"
}
export type IssuesStatusType = typeof IssuesStatus[keyof typeof IssuesStatus];