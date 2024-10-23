import express from 'express';
import router from "./router/index.js";

const app = express();
app.use(router);
const port = 3001;


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;