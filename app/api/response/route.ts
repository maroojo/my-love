import { NextResponse } from "next/server";
import {
  getLatestResponse,
  getResponses,
  saveResponse,
} from "@/lib/response-store";
import type { Answer } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("answer" in body)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request",
        },
        { status: 400 },
      );
    }

    const answer = (body as { answer?: unknown }).answer;

    if (answer !== "yes" && answer !== "no") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid answer",
        },
        { status: 400 },
      );
    }

    const record = await saveResponse(answer as Answer);

    return NextResponse.json(
      {
        success: true,
        record,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/response error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to save response",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const latest = await getLatestResponse();
    const responses = await getResponses();

    return NextResponse.json({
      success: true,
      latest,
      count: responses.length,
    });
  } catch (error) {
    console.error("GET /api/response error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to read responses",
      },
      { status: 500 },
    );
  }
}