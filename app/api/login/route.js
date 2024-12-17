import connectMongoDb from "@/libs/mongodb";
import Users from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {email , password} = await request.json();
    await connectMongoDb();
    const user = await Users.findOne({ email, password });
    if (!user) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Login successful' , user : user } , { status: 201 });
}