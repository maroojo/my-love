import "server-only";

import { randomUUID } from "node:crypto";
import { del, head, put } from "@vercel/blob";
import type { Answer, ResponseRecord } from "./types";

const BLOB_PATH = "data/responses.json";

async function readResponses(): Promise<ResponseRecord[]> {
  try {
    const blob = await head(BLOB_PATH);

    const response = await fetch(blob.url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to read responses.json");
    }

    const data: unknown = await response.json();

    return Array.isArray(data) ? (data as ResponseRecord[]) : [];
  } catch (error) {
    console.error("readResponses error:", error);

    return [];
  }
}

async function writeResponses(
  responses: ResponseRecord[],
): Promise<void> {
  await put(
    BLOB_PATH,
    JSON.stringify(responses, null, 2),
    {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    },
  );
}

export async function saveResponse(
  answer: Answer,
): Promise<ResponseRecord> {
  const responses = await readResponses();

  const record: ResponseRecord = {
    id: randomUUID(),
    answer,
    createdAt: new Date().toISOString(),
  };

  responses.push(record);

  await writeResponses(responses);

  return record;
}

export async function getResponses(): Promise<ResponseRecord[]> {
  return readResponses();
}

export async function getLatestResponse(): Promise<ResponseRecord | null> {
  const responses = await readResponses();

  return responses.at(-1) ?? null;
}