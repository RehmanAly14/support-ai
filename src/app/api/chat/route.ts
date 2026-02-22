import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, ownerId } = await req.json();

    if (!message || !ownerId) {
      return NextResponse.json(
        { message: "Message and OwnerId are required" },
        { status: 400 },
      );
    }
    await connectDb();
    const setting = await Settings.findOne({ ownerId });
    if (!setting) {
      return NextResponse.json(
        { message: "Settings not found for the owner" },
        { status: 400 },
      );
    }
    const KNOWLEDGE = `bussiness name- ${setting.bussinessName || " not provided"}
        support email- ${setting.supportEmail || " not provided"}
        knowledge- ${setting.knowledge || " not provided"}`;

    const prompt = ` you are a professional customer support for this business. 
        Use ONLY the information provided below to answer the customers question.
        you may rephrase, summarize, or interpret the information if needed.
        Do NOT invent new policies,prices,or promises that are not explicitly stated in the information provided.
        If you don't know the answer, say you don't know. Do not try to make up an answer.
        Information about the business:
        ${KNOWLEDGE}
        Customer's question: ${message}
        ----------------
        ANSWER
        ----------------
          `;
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const res = NextResponse.json(response.text);
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return res;
  } catch (error) {
    const res = NextResponse.json(
      { message: `Error generating AI response:${error}` },
      { status: 500 },
    );
     res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return res;
  }
}

export async function OPTIONS() {
  return NextResponse.json(null,{
    status: 201,
    headers:{
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
  
}
