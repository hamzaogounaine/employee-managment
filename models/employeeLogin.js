import mongoose,  { Schema } from "mongoose";


const employeeLoginSchema = new Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    username :{
        type : String,
        required : true,
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
});

const EmployeeLogin = mongoose.models.EmployeeLogin || mongoose.model('EmployeeLogin', employeeLoginSchema);

export default EmployeeLogin;