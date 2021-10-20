import dotenv from 'dotenv';
dotenv.config()
import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import jwt from 'jsonwebtoken';
import {Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

const userModel = mongoose.model('user');

//Helper Functions
const alreadyExists = async (email, username) => (
    await userModel.exists({
        '$or': [
            {email: email},
            {username: username}
        ]
    })
);

//POST Request Handler
const registerNewUser = async(req, res) => {
    try {
        if(await alreadyExists(req.body.email, req.body.username)) {
            res.status(403).send('Username or email already exists!');
        } else {
            let user = await userModel.create(req.body);
            res.status(201).json(user);
        }
    }catch (err) {
        res
            .status(400)
            .send('The body of the Request is missing or malformed.');
        console.log(err);
    }
};

const getAllUsers= async(req, res) => {
    try {
        let users = await userModel.find({}, '', {sort: {_id: -1}}).exec();
        console.log(users);
        res.status(200).json(users);
    } catch(err) {
        res.status(400).send('Bad request');
    }
};

const logInUser = (req, res) => {
    jwt.sign(
        {sub: req.user._id,
        username: req.user.username},
        process.env.JWT_SECRET,
        { expiresIn: '1h'},
        (error, token) => {
            if(error) {
                res.status(400).send('Bad Request. Couldn\'t generate token.');
            } else {
                res.status(200).json({token: token});
            }
        }
    );
};

passport.use(new JwtStrategy(
    jwtOptions, (jwt_payload, done) => {
        userModel
        .findById(jwt_payload.sub)
        .exec((error, user) => {
            if(error) return done(error);
            if(!user) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        })
    }
));

passport.use(new LocalStrategy(
    (username, password, done) => {
        userModel
        .findOne({
            '$or': [
                {email: username},
                {username: username}
            ]
        })
        .exec(async (error, user) => {
            if(error) return done(error);
            if(!user) return done(null, false);

            if(!await user.verifyPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        })
    }
))

export default { registerNewUser, logInUser, getAllUsers };