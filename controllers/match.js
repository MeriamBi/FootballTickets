import Match from '../models/match.js';
import { validationResult } from 'express-validator';

export function createMatch(req, res) {
    if (!validationResult(req).isEmpty()) {
        res.status(400).json({ errors: validationResult(req).array() });
    } else {
        const match = new Match({
            date: req.body.date,
            teamHome: req.body.teamHome,
            teamAway: req.body.teamAway,
            nbPlaces: req.body.nbPlaces,
        });
        match.save()
            .then(doc => {
                res.status(201).json({
                    date:doc.date,
                    teamHome:doc.teamHome,
                    teamAway:doc.teamAway,
                    nbPlaces:doc.nbPlaces,
                });
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
    }
}

export function findAll(req, res) {
    Match.find()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

export function updateDate(req, res) {
    if (!validationResult(req).isEmpty()) {
        res.status(400).json({ errors: validationResult(req).array() });
    } else {
        Match
            .findByIdAndUpdate(req.params.id, { "date": req.body.date })
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
    }
}