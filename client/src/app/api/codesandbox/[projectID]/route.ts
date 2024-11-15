import { NextResponse } from 'next/server';

enum Sandbox_Project_Ids {
  'BLOG_APP' = 'github/shoaib-vaival/Blogging_Website/main',
  'CHATBOT_APP' = 'github/shoaib-vaival/nextjs-ai-chatbot/main',
  'CALCULATOR_APP' = 'github/shoaib-vaival/energy-saver-calculator/main',
  'FITNESS_APP' = 'github/shoaib-vaival/FitClub/master',
  'BOOKING_APP' = 'github/shoaib-vaival/Online-Booking-Management/main',
}

export async function GET(request: any, response: any) {
  const { projectID } = response.params;
  const id =
    Sandbox_Project_Ids[
      projectID?.toUpperCase() as keyof typeof Sandbox_Project_Ids
    ];
  try {
    const resp = await fetch('https://codesandbox.io/api/v1/sandboxes/' + id, {
      cache: 'no-store',
    });
    const data = await resp.json();
    return NextResponse.json({
      status: 'success',
      message: 'fetched prompts successfully',
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      status: 'fail',
      message: 'Something went wrong',
      data: error,
    });
  }
}
