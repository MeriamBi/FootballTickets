import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import fanRoutes from './routes/fan.js';
import matchRoutes from './routes/match.js';
import ticketRoutes from './routes/ticket.js';
import { errorHandler, notFoundError } from './middlewares/error-handler.js';

const app = express();
//const mongo_uri=process.env.DB_URL || `mongodb://mongo`;
const mongo_uri=process.env.DB_URL || `mongodb://127.0.0.1:27017`;
const port = process.env.PORT || 9090;
const dbName = 'examencoteserveur2223sp';



mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose.connect(`${mongo_uri}/${dbName}`)
  .then(() => {
    console.log(`Connected to ${dbName}`);
  })
  .catch(err => {
    console.log(err);
  });

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static('public/images'));

//ROUTES
app.use('/fans', fanRoutes);
app.use('/matchs', matchRoutes);
app.use('/tickets', ticketRoutes);


// Middlewares Routes introuvables
app.use(notFoundError);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
})