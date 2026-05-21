import { app, PORT } from "./app";

const application = app
const port = PORT

application.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});