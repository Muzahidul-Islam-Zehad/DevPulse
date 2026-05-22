import express from "express";
import { userRouter } from "./modules/Authentication/user.route";
import { issuesRouter } from "./modules/Issues/issues.route";
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/api/auth', userRouter);
app.use('/api/issues', issuesRouter);


export default app;