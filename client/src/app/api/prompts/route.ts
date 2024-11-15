import { NextResponse } from 'next/server';
import { prompts } from './data';

export async function GET() {
  try {
    return NextResponse.json({
      status: 'success',
      message: 'fetched prompts successfully',
      data: prompts,
    });
  } catch (error) {
    return NextResponse.json({
      status: 'fail',
      message: 'Something went wrong',
      data: error,
    });
  }
}
