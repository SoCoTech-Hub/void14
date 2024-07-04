import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createContext,
  deleteContext,
  updateContext,
} from "../../../lib/api/contexts/mutations";
import {
  contextIdSchema,
  insertContextParams,
  updateContextParams,
} from "../../../lib/db/schema/contexts";

export async function POST(req: Request) {
  try {
    const validatedData = insertContextParams.parse(await req.json());
    const { context } = await createContext(validatedData);

    revalidatePath("/contexts"); // optional - assumes you will have named route same as entity

    return NextResponse.json(context, { status: 201 });
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

    const validatedData = updateContextParams.parse(await req.json());
    const validatedParams = contextIdSchema.parse({ id });

    const { context } = await updateContext(validatedParams.id, validatedData);

    return NextResponse.json(context, { status: 200 });
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

    const validatedParams = contextIdSchema.parse({ id });
    const { context } = await deleteContext(validatedParams.id);

    return NextResponse.json(context, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
