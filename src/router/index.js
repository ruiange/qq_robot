// src/router/index.js
import express from 'express';





const router = express.Router();

router.get('/', async (req, res) => {
    res.send(`我真的太想进步了~！`);
});
router.post('/', async (req, res) => {
    const {body} = req;
    res.send(`我真的太想进步了~！`);
});

export default router;