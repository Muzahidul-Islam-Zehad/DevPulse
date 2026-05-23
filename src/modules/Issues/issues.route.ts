import { Router } from "express";
import { issuesController } from "./issues.controller";
import { createIssuesMiddleware } from "../../middleware/createissues.middleware";


const router = Router();

router.post('/', createIssuesMiddleware, issuesController.createIssues )
router.get('/', issuesController.getIssues)

export const issuesRouter = router;