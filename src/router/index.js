// src/router/index.js
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    const appid = process.env.APPID || 0
    res.send(`我真的太想进步了~！${appid}`);
});

export default router;