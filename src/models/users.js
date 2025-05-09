import mongoose from 'mongoose';




const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true }
})

const userModel = mongoose.models.User  || mongoose.model('User', userSchema);  //if user already exists, use it, else create a new one

export default userModel;  //export the model to use it in other files