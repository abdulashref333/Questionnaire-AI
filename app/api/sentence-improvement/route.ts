// 1. Install required packages: pnpm i dotenv langchain pusher zod

// 2. Import necessary modules

import { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';
import { ChatOpenAI } from 'langchain/chat_models/openai';
// import z from 'zod';
// import Pusher from 'pusher';

dotenv.config();

// 4. Instantiate ChatOpenAI model with specific options
const model = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0, streaming: true });

// 6. Handle incoming POST request
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // Parse JSON content from the request body

  try {
    const { sentence } = await req.body;

    const result = await model.completionWithRetry({
      prompt: sentence,
      maxTokens: 60,
    });

    const enhancedOptions = result.choices.map(choice => choice.text);
    res.status(200).json({ options: enhancedOptions });

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while enhancing the sentence.' });

  }
};