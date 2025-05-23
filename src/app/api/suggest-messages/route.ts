import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      max_tokens: 400,
      stream: true,
      prompt,
    });

    // Create a TransformStream to handle the OpenAI streaming response
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const text = chunk.choices[0]?.text || "";
        controller.enqueue(encoder.encode(text));
      },
    });

    // Pipe the OpenAI response into our transform stream
    (async () => {
      try {
        for await (const chunk of response) {
          transformStream.writable.getWriter().write(chunk);
        }
        transformStream.writable.getWriter().close();
      } catch (error) {
        console.error("Stream processing error:", error);
        transformStream.writable.getWriter().abort(error);
      }
    })();

    // Return the readable side of the transform stream as the response
    return new Response(transformStream.readable);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      // OpenAI API error handling
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      // General error handling
      console.error("An unexpected error occurred:", error);
      throw error;
    }
  }
}
