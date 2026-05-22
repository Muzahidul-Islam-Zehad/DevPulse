import type { Request, Response } from "express";
import commonResponse from "../../utils/commonResponse";
import { issuesService } from "./issues.service";
import type { IJwtPayload } from "../../types/jwtPayload.interface";
import type { IIssues } from "./issues.interface";

const createIssues = async (req: Request, res: Response) => {
    try {

        const result = await issuesService.createIssuesInDatabase(req.user as IJwtPayload, req.body as IIssues);
        commonResponse(res, { status: 201, success: true, message: "Issues created successfully", data: result })
    } catch (error: any) {
        commonResponse(res, { status: 400, success: false, message: "Failed to create issues", errors: error.message })
    }
}

export const issuesController = {
    createIssues
}