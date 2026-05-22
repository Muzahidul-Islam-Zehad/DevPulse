import { pool } from "../../db";
import type { IJwtPayload } from "../../types/jwtPayload.interface";
import {IssuesStatus, IssuesTypes, type IIssues, type IssuesStatusType, type IssuesType } from "./issues.interface";

const createIssuesInDatabase = async (user: IJwtPayload, body: IIssues) => {

    const { id } = user;
    const { title, description, type, status } = body;

    if (title.length > 150 || description.length < 20 || type !== IssuesTypes.bug && type !== IssuesTypes.feature_request || (status && status !== IssuesStatus.open && status !== IssuesStatus.in_progress && status !== IssuesStatus.resolved)) {
        throw new Error("Invalid input data");
    }

    const result = await pool.query(
        `
            INSERT INTO issues(title, description, type, reporter_id) VALUES($1, $2, $3, $4) RETURNING *
        `, [title, description, type, id]
    )

    const data = result.rows[0];
    return data;
}





export const issuesService = {
    createIssuesInDatabase
}