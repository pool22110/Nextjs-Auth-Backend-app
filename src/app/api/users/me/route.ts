import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getdatafromToken";

connectDB();

export async function GET(request: NextRequest) {
  ////Extract data from token

  try {
    const userId = await getDataFromToken(request);
    console.log(userId);

    const user = await User.findOne({ _id: userId }).select("-password");
    if(!user) {
        return NextResponse.json(
            { error: "User does not exists" },
            { status: 400 }
          );
    }
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
