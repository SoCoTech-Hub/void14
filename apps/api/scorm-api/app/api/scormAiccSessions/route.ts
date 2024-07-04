import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createScormAiccSession,
  deleteScormAiccSession,
  updateScormAiccSession,
} from "../../../lib/api/scormAiccSessions/mutations";
import {
  insertScormAiccSessionParams,
  scormAiccSessionIdSchema,
  updateScormAiccSessionParams,
} from "../../../lib/db/schema/scormAiccSessions";

export async function POST(req: Request) {
  try {
    const validatedData = insertScormAiccSessionParams.parse(await req.json());
    const { scormAiccSession } = await createScormAiccSession(validatedData);

    revalidatePath("/scormAiccSessions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(scormAiccSession, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateScormAiccSessionParams.parse(await req.json());
    const validatedParams = scormAiccSessionIdSchema.parse({ id });

    const { scormAiccSession } = await updateScormAiccSession(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(scormAiccSession, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = scormAiccSessionIdSchema.parse({ id });
    const { scormAiccSession } = await deleteScormAiccSession(
      validatedParams.id,
    );

    return NextResponse.json(scormAiccSession, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
