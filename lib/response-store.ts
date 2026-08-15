import "server-only";

import { randomUUID } from "node:crypto";
import { sql } from "./db";
import type { Answer, ResponseRecord } from "./types";

export async function saveResponse(
  answer: Answer,
): Promise<ResponseRecord> {
  const id = randomUUID();

  const rows = await sql`
    INSERT INTO responses (
      id,
      answer
    )
    VALUES (
      ${id},
      ${answer}
    )
    RETURNING
      id,
      answer,
      created_at
  `;

  const row = rows[0];

  return {
    id: String(row.id),
    answer: row.answer as Answer,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export async function getResponses(): Promise<ResponseRecord[]> {
  const rows = await sql`
    SELECT
      id,
      answer,
      created_at
    FROM responses
    ORDER BY created_at ASC
  `;

  return rows.map((row) => ({
    id: String(row.id),
    answer: row.answer as Answer,
    createdAt: new Date(row.created_at).toISOString(),
  }));
}

export async function getLatestResponse(): Promise<ResponseRecord | null> {
  const rows = await sql`
    SELECT
      id,
      answer,
      created_at
    FROM responses
    ORDER BY created_at DESC
    LIMIT 1
  `;

  const row = rows[0];

  if (!row) {
    return null;
  }

  return {
    id: String(row.id),
    answer: row.answer as Answer,
    createdAt: new Date(row.created_at).toISOString(),
  };
}