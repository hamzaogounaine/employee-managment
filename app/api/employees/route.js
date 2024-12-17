import connectMongoDb from '@/libs/mongodb.js';
import Employees from '@/models/employees';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectMongoDb();
        const employeeData = await request.json();
        console.log('employeeData:', employeeData);
        await Employees.create(employeeData);
        return NextResponse.json({ message: 'Employee added successfully'}, { status: 201 });
    } catch (error) {
        console.log('Error adding employee:', error); // Log the error details
        return NextResponse.json({ message: 'Error adding employee', error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongoDb();
        const employees = await Employees.find();
        return NextResponse.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error); // Log the error details
        return NextResponse.json({ message: 'Error fetching employees', error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get('id');
        await connectMongoDb();
        const deletedEmployee = await Employees.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
        }
        return NextResponse.json({ message: `Employee with id: ${id} deleted successfully` });
    } catch (error) {
        console.error('Error deleting employee:', error); // Log the error details
        return NextResponse.json({ message: 'Error deleting employee', error: error.message }, { status: 500 });
    }
}