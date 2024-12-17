import connectMongoDb from '@/libs/mongodb.js';
import EmployeeLogin from '@/models/employeeLogin';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectMongoDb();
        const employeeData = await request.json();
        console.log('employeeDataLogin:', employeeData);
        await EmployeeLogin.create(employeeData);
        return NextResponse.json({ message: 'Employee added successfully'}, { status: 201 });
    } catch (error) {
        console.log('Error adding employee:', error); // Log the error details
        return NextResponse.json({ message: 'Error adding employee', error: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await connectMongoDb();
        const employees = await EmployeeLogin.find();
        return NextResponse.json(employees);
    } catch (error) {
        console.log('Error fetching employees:', error); // Log the error details
        return NextResponse.json({ message: 'Error fetching employees', error: error.message }, { status: 500 });
    }
}