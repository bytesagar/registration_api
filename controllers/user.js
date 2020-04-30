const User = require("../database/models/User");

const createUser = async (req,res,next) =>{
    try{
        const user = await new User(req.body);
        await user.save();

        res.status(201).send({status: 'Success', payload: user})
    } catch(error){
        next(error);
    }
}