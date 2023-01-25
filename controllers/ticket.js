import Ticket from '../models/ticket.js';
import Match from '../models/match.js';
import Fan from '../models/fan.js';

export async function createTicket(req, res) {
    try {
        const match = await Match.findById(req.params.matchId);
        const fan = await Fan.findById(req.params.fanId);
        console.log(fan.team == match.teamHome);
        console.log(fan.team == match.teamAway);
        if (fan.team == match.teamHome || fan.team == match.teamAway) {
            if (match.nbPlaces > 0) {
                const ticket = new Ticket({
                    fanId: req.params.fanId,
                    matchId: req.params.matchId
                });
                ticket.save()
                    .then(async doc => {
                        match.nbPlaces=match.nbPlaces-1;
                        await match.save();
                        res.status(200).json(doc);
                    });
            } else {
                res.status(403).json({ message: "No free places" });
            }
        } else {
            res.status(403).json({ message: "Not a fan" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export function getByFan(req, res) {
    Ticket.find({ fanId: req.params.fanId })
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}