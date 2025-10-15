import express from 'express';
import protect from '../../middleware/auth.js';
import { createKamus, getKamus, updateKamus, deleteKamus } 
from '../../controller/kamusController.js';

const router = express.Router();

router.route('/')
    .post(protect, createKamus);
   

router.route('/:id')
    .get(protect, getKamus)
    .put(protect, updateKamus)
    .delete(protect, deleteKamus);

export default router;