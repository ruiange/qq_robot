import express from 'express';
import router from "./router/index.js";
import dotenv from "dotenv";
import client from "./main.js";
// 加载.env文件中的环境变量
dotenv.config();


const app = express();
app.use(express.json());
app.use(router);

const port = 3001;


app.listen(port, async () => {
  console.log(`http://localhost:${port}`);
  await client.online()
});

export default app;