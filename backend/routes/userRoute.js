import express from 'express';
import User from '../models/userModel';

const userRoute = express.Router();

userRoute.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'Chinh',
            email: 'chinhphamvanvn@gmail.com',
            password: '123456',
            isAdmin: true
        });
    
        const newUser = await user.save();
        res.send(newUser);
    }
    catch (error) {
        res.send({ msg: error.message })
    }
    
})

userRoute.post('/signin', async(req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
    }
})

export default userRoute;