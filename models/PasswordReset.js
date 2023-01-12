import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const passwordResetSchema = new Schema ( {
    email:{type: String, required:[true, 'email is required']},
    token:{type: String, required:[true, 'token is required']},
});

export default model('PasswordReset', passwordResetSchema)