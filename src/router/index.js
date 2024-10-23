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

    const { body } = req;
    const botSecret = process.env.SECRET
    console.warn(botSecret)
    // 解析请求体中的 payload
    let payload;
    try {
        payload = JSON.parse(body);
    } catch (err) {
        console.error('parse http payload err', err);
        return;
    }

    // 解析 payload 中的 data 字段
    let validationPayload;
    try {
        validationPayload = JSON.parse(payload.data);
    } catch (err) {
        console.error('parse http payload failed:', err);
        return;
    }

    // 生成签名所需的 seed
    let seed = botSecret;
    while (seed.length < 32) { // ed25519 的种子大小通常是 32 字节
        seed += seed;
    }
    seed = seed.substring(0, 32);

    // 使用 crypto 模块生成签名
    const privateKey = crypto.createPrivateKey({ key: seed, format: 'der', type: 'ed25519' });
    const message = validationPayload.eventTs + validationPayload.plainToken;
    const signature = crypto.createSign('sha512').update(message).sign(privateKey, 'hex');

    // 构建响应体
    const response = {
        plain_token: validationPayload.plainToken,
        signature: signature,
    };

    // 发送响应
    res.json(response);

});

export default router;