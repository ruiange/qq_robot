// src/router/index.js
import express from 'express';
import getAppAccessToken from "../utils/getAppAccessToken.js";

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
    res.send('test');
});

export default router;