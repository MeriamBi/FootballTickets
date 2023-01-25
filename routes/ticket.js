import express from 'express';
import { body } from 'express-validator';
import { createTicket, getByFan } from '../controllers/ticket.js';

const router = express.Router();

router.route('/:fanId/:matchId')
    .get(createTicket);
router.route('/:fanId')
    .get(getByFan);

export default router;