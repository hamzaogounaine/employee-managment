import mongoose, { Schema } from "mongoose";



const userssSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

// Prevent model overwrite during HMR
const Users = mongoose.models.User || mongoose.model("User", userssSchema);

export default Users;

