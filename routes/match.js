import express from 'express';
import { body } from 'express-validator';
import { createMatch, findAll, updateDate } from '../controllers/match.js';

const router = express.Router();

router.route('/')
    .post(
        body('date').isLength({ min: 6 }),
        body('teamHome').isLength({ min: 2 }),
        body('teamAway').isLength({ min: 2 }),
        body('nbPlaces').isInt(),
        createMatch
    )
    .get(findAll);

router.route('/:id')
.patch(
    body('date').isLength({ min: 6 }),
    updateDate
    );

export default router;