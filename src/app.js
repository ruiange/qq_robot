import express from 'express';
import router from "./router/index.js";
import dotenv from "dotenv";
// 加载.env文件中的环境变量
dotenv.config();
const app = express();
app.use(router);
const port = 3001;


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

export default app;