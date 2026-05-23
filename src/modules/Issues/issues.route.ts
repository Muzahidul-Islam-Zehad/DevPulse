import { Router } from "express";
import { issuesController } from "./issues.controller";
import { createIssuesMiddleware } from "../../middleware/createissues.middleware";
import { updateIssuesMiddleware } from "../../middleware/updateIssues.middleware";


const router = Router();

router.post('/', createIssuesMiddleware, issuesController.createIssues )
router.get('/', issuesController.getIssues)
router.get('/:id', issuesController.getIssuesById)
router.patch('/:id', updateIssuesMiddleware, issuesController.updateIssues)

export const issuesRouter = router;