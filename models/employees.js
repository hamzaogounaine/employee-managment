import mongoose,  { Schema } from "mongoose";



const employeesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,   
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    }
});

// Prevent model overwrite during HMR
const Employees = mongoose.models.Employee || mongoose.model("Employee", employeesSchema);

export default Employees;
