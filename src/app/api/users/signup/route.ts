import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    //Validation
    console.log(reqBody);
    console.log('1');
    const user = await User.findOne({ email });
    

    if (user) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }
    // console.log('2');
    const salt = await bcryptjs.genSalt(10);
    // console.log('3');
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    // console.log('4');
    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send verification mail
    // console.log('5');
    await sendEmail({email,emailType:"Verify",userId:savedUser._id})

    return NextResponse.json({message:"User registered successfully", success:true, savedUser})

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
