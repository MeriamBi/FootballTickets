import express from 'express';
import { body } from 'express-validator';
import { createFan, getByTeam } from '../controllers/fan.js';
import multer from '../middlewares/multer-config.js';

const router = express.Router();

router.route('/')
    .post(
        multer("image"),
        body('fullname').isLength({ min: 5, max: 50 }),
        body('team').isLength({ min: 2, max: 100 }),
        body('phone').isAlphanumeric().isLength(8),
        createFan
    );
router.route('/:team')
    .get(getByTeam);

export default router;