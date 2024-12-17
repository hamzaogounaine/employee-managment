import connectMongoDb from "@/libs/mongodb";
import Users from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { email, password, username ,role } = await request.json();
        console.log(email, password, username, role);
        await connectMongoDb();
        await Users.create({ email, password, username, role });
        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error); // Log the error details
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await connectMongoDb();
        const users = await Users.find();
        console.log(users)
        return NextResponse.json(users);

    } catch (error) {
        console.error('Error fetching users:', error); // Log the error details
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}