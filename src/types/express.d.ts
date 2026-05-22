import type { IJwtPayload } from "./jwtPayload.interface";

declare global {
    namespace Express {
        interface Request {
            user?: IJwtPayload;
        }
    }
}
// export {};
