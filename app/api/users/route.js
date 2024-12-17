import connectMongoDb from '@/libs/mongodb.js';
import Users from '@/models/user';
import {  NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { username , email } = await request.json();
        await connectMongoDb();
        const user = await Users.findOne({$or: [{ username: username }, { email: email }]
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
}

export async function GET() {
    await connectMongoDb();
    const users = await Users.find();
    return NextResponse.json(users); 
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDb();
    await Users.findByIdAndDelete(id);
    return NextResponse.json({ message: `User with id : ${id} deleted successfully` });
}