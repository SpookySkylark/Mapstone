import dotenv from 'dotenv';
dotenv.config()
import './db.js';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import passport from 'passport';

import apiRouter from './routes/api-router.js';

const app = express();

//Express Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

app.use(rateLimit());


//Routing
app.get('/', (req, res) => {
    res.send('Node.js Server is live!');
})


app.use('/api', apiRouter);

export default app;