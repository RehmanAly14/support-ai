import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try {
        const {ownerId,bussinessName,supportEmail,knowledge}= await req.json();

        if(!ownerId){
            return NextResponse.json({message:"OwnerId is required"}, {status:400});
        }

        await connectDb();
        const settings= await Settings.findOneAndUpdate(
            {ownerId},
            {bussinessName,supportEmail,knowledge},
            {new:true,upsert:true}
        );
        return NextResponse.json({message:"Settings saved successfully",settings}, {status:200});
    } catch (error) {
        return NextResponse.json({message:`Error saving settings: ${error}`}, {status:500});
    }
}

