// src/router/index.js
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('我真的太想进步了~！');
});

export default router;