import "server-only";

import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Answer, ResponseRecord } from "./types";

const dataDirectory = path.join(process.cwd(), "data");
const dataFile = path.join(dataDirectory, "responses.json");

async function ensureDataFile() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    await readFile(dataFile, "utf8");
  } catch {
    await writeFile(dataFile, "[]\n", "utf8");
  }
}

async function readResponses(): Promise<ResponseRecord[]> {
  await ensureDataFile();

  const raw = await readFile(dataFile, "utf8");

  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ResponseRecord[]) : [];
  } catch {
    return [];
  }
}

export async function saveResponse(answer: Answer): Promise<ResponseRecord> {
  const responses = await readResponses();

  const record: ResponseRecord = {
    id: randomUUID(),
    answer,
    createdAt: new Date().toISOString(),
  };

  responses.push(record);
  await writeFile(dataFile, `${JSON.stringify(responses, null, 2)}\n`, "utf8");

  return record;
}

export async function getResponses(): Promise<ResponseRecord[]> {
  return readResponses();
}

export async function getLatestResponse(): Promise<ResponseRecord | null> {
  const responses = await readResponses();
  return responses.at(-1) ?? null;
}