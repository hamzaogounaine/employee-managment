import connectMongoDb from '@/libs/mongodb.js';
import Employees from '@/models/employees';
import { NextResponse } from 'next/server';

export async function PUT(request) {
    const { id } = request.params;
    const employeeData = await request.json();
    await connectMongoDb();
    const updatedEmployee = await Employees.findByIdAndUpdate(id, employeeData, { new: true });

    if (!updatedEmployee) {
        return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Employee updated successfully', employee: updatedEmployee }, { status: 201 });
}

export async function GET(request, { params }) {
    const { id } = params; // params should contain the dynamic route segment
    await connectMongoDb();

    const employee = await Employees.findById(id);

    if (!employee) {
        return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json(employee);
}


export async function DELETE(request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    await connectMongoDb();
    const deletedEmployee = await Employees.findByIdAndDelete(id);

    if (!deletedEmployee) {
        return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json({ message: `Employee with id: ${id} deleted successfully` });
}

export async function POST(request) {
    const employeeData = await request.json();
    await connectMongoDb();
    const newEmployee = await Employees.create(employeeData);
    return NextResponse.json({ message: 'Employee added successfully', employee: newEmployee }, { status: 201 });
}