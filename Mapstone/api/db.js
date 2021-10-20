import mongoose from 'mongoose';

let dbURI = 'mongodb://localhost:27017/pins_db';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', () => {
    console.log('Mongoose connection error');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected.');
});

import './models/pin-schema.js';
import './models/user-schema.js';