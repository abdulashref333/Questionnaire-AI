import dotenv from 'dotenv';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest } from 'next/server';
dotenv.config();

// 4. Instantiate ChatOpenAI model with specific options
const model = new ChatOpenAI({ 
  openAIApiKey: process.env.OPENAI_API_KEY, 
  temperature: 0.2, 
  streaming: true 
});

// 6. Handle incoming POST request
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (session) {

    try {
      const { sentence } = await req.json();

      const prompt = ChatPromptTemplate.fromMessages([
        ["system", `Enhance This sentence and correct its grammar: "${sentence}"`],
      ]);

      const outputParser = new StringOutputParser();

      const chain = prompt.pipe(model).pipe(outputParser);

      const response = await chain.invoke({
        topic: "ice cream",
      });

      return new Response(JSON.stringify({ response }), {
        status: 200,
      })

    } catch (error) {
      console.error(error);

      return new Response(JSON.stringify({ error: 'An error occurred while enhancing the sentence.' }), {
        status: 200,
      })
    }

  } else {
    return new Response(JSON.stringify({ error: 'Not signed in' }), {
      status: 401
    })
  }

};