import mongoose from 'mongoose';
const pinModel = mongoose.model('pins');

const getAllPins = async(req, res) => {
    try {
        let messages = await pinModel.find({}, '', {sort: {_id: -1}}).exec();
        console.log(messages);
        res.status(200).json(messages);
    } catch(err) {
        res.status(400).send('Bad request');
    }
};

const addNewPin = async(req, res) => {
    //res.status(200).send('Successful API POST Request');
    try {
        //let message = await messageSchema.validate(req.body);
        //TODO: Add message as first element of array and respond with 201 created and the message as JSON in the body
        //message.id = messages.length;
        //messages.unshift(message);
        //res.status(201).send('Added message');
        let message = await pinModel.create(req.body);
        res.status(201).json(message);
        //console.log(messages);
    } catch (err) {
        res
            .status(400)
            .send('Bad Request. Message in the body of the Request is either missing or malformed: ' + err);
    }
};

const deletePin = async (req, res) => {
    try {
        let pin = await pinModel.findById(req.params.pinId).exec();
        if(!pin) {
            //Message was not found but everything else was A-OK
            res.sendStatus(404);
        } else {
            console.log("AdminStatus: " + req.user.admin);
            if(req.user.admin) {
                await pin.remove();
                res.sendStatus(204);
            } else {
                //Not Authorized!
                res.sendStatus(401);
            }
        }
    } catch(err) {
        res.sendStatus(400);
    }
    
};

export default { getAllPins, addNewPin, deletePin };