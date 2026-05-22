import type { NextFunction, Request, Response } from "express";
import commonResponse from "../utils/commonResponse";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db";
import type { IJwtPayload } from "../types/jwtPayload.interface";

export const createIssuesMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {
        //get token from headers
        const token = req.headers.authorization;

        // if token available 
        if (!token) {
            return commonResponse(res, { status: 401, success: false, message: "Unauthorized" })
        }

        // if available then verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IJwtPayload;

        // query for user by decoded.email
        const fetchUser = await pool.query(
            `
            SELECT * FROM users WHERE email = $1
            `,[decoded.email]
        )

        if(fetchUser.rows.length === 0){
            return commonResponse(res, { status: 401, success: false, message: "Unauthorized" })
        }

        req.user = decoded

        next();

    } catch (error: any) {
        commonResponse(res, { status: 401, success: false, message: "Unauthorized", errors: error.message })
    }
}
