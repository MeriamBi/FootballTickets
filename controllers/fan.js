import Fan from '../models/fan.js';
import { validationResult } from 'express-validator';

export function createFan(req, res) {
    if (!validationResult(req).isEmpty()) {
        res.status(400).json({ errors: validationResult(req).array() });
    } else {
        const fan = new Fan({
            fullname: req.body.fullname,
            phone: req.body.phone,
            team: req.body.team,
            image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
            onSale: req.body.onSale,
        });
        fan.save()
            .then(doc => {
                res.status(201).json({
                    fullname:doc.fullname,
                    phone:doc.phone,
                    team:doc.team,
                    image:doc.image,
                });
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
    }
}

export function getByTeam(req, res) {
    Fan.find({ team: req.params.team })
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}