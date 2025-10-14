import express from "express"

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Selamat Datang di Kamus' });
});

export default router;