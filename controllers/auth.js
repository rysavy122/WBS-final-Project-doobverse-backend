import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import asyncHandler from '../utils/asyncHandler';
import ErrorResponse from '../utils/ErrorResponse';

export const signUp = asyncHandler(async (req, res, next) => {
    const {
        body: {email, password, ...rest}
    } = req;
    const found = await User.findOne({email});
    if(found) throw new ErrorResponse('User already exists', 403);
    const hash = await bcrypt.hash(password, 5);
    const {_id} = await User.create({...rest, email, password: hash});
    const token = jwt.sign({_id}, process.env.JWT_SECRET);
    res.status(201).json({token});
    console.log(req.body)
});

export const logIn = asyncHandler(async (req, res, next)=>{
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


