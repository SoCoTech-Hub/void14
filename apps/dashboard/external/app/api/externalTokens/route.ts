import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createExternalToken,
  deleteExternalToken,
  updateExternalToken,
} from "@/lib/api/externalTokens/mutations";
import { 
  externalTokenIdSchema,
  insertExternalTokenParams,
  updateExternalTokenParams 
} from "@/lib/db/schema/externalTokens";

export async function POST(req: Request) {
  try {
    const validatedData = insertExternalTokenParams.parse(await req.json());
    const { externalToken } = await createExternalToken(validatedData);

    revalidatePath("/externalTokens"); // optional - assumes you will have named route same as entity

    return NextResponse.json(externalToken, { status: 201 });
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

    const validatedData = updateExternalTokenParams.parse(await req.json());
    const validatedParams = externalTokenIdSchema.parse({ id });

    const { externalToken } = await updateExternalToken(validatedParams.id, validatedData);

    return NextResponse.json(externalToken, { status: 200 });
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

    const validatedParams = externalTokenIdSchema.parse({ id });
    const { externalToken } = await deleteExternalToken(validatedParams.id);

    return NextResponse.json(externalToken, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
