import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import PasswordReset from '../models/PasswordReset.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const resetPassword = asyncHandler(async(req, res, next)=>{
    const email = req.body.email;
    const token = Math.random().toString(20).substring(2,12); 

    const passwordReset = new PasswordReset({
        email,
        token
    })

    await passwordReset.save()
    console.log(passwordReset, "hallo")
})



export const signIn = asyncHandler(async (req, res, next)=>{
    const {
        body: {email, password}
    } = req;
    const found = await User.findOne( {email} ).select('+password');
    if(!found) throw new ErrorResponse('No User found...', 404);
    const match = await bcrypt.compare(password, found.password);
    if(!match) throw new ErrorResponse('Wrong Password...', 401);
    const token = jwt.sign({ _id: found._id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
});

export const getUser = asyncHandler(async(req, res, next)=>{
    const { userId } = req;
    const user = await User.findById(userId);
    res.status(201).json(user);
});