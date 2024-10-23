// src/router/index.js
import express from 'express';
import getAppAccessToken from "../utils/getAppAccessToken.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const appid = process.env.APPID || 0
    const accessToken =await getAppAccessToken()
    res.send(`我真的太想进步了~！${appid} ${accessToken}`);
});

export default router;