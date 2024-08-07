import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMnetSession,
  deleteMnetSession,
  updateMnetSession,
} from "@soco/mnet-api/mnetSessions/mutations";
import { 
  mnetSessionIdSchema,
  insertMnetSessionParams,
  updateMnetSessionParams 
} from "@soco/mnet-db/schema/mnetSessions";

export async function POST(req: Request) {
  try {
    const validatedData = insertMnetSessionParams.parse(await req.json());
    const { mnetSession } = await createMnetSession(validatedData);

    revalidatePath("/mnetSessions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(mnetSession, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateMnetSessionParams.parse(await req.json());
    const validatedParams = mnetSessionIdSchema.parse({ id });

    const { mnetSession } = await updateMnetSession(validatedParams.id, validatedData);

    return NextResponse.json(mnetSession, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = mnetSessionIdSchema.parse({ id });
    const { mnetSession } = await deleteMnetSession(validatedParams.id);

    return NextResponse.json(mnetSession, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
