// src/router/index.js
import express from 'express';
import crypto from 'crypto';
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('访问方式：get')
    const appid = process.env.APPID || 0
    // const accessToken =await getAppAccessToken()
    // res.send(`我真的太想进步了~！${appid} ${accessToken}`);
    res.send(`我真的太想进步了~！${appid}`);
});
router.post('/', async (req, res) => {
    console.log('访问方式：post')

    const { body, botSecret } = req;

    console.warn(body, botSecret)

    // 发送响应
    res.json({code:0});
});

export default router;