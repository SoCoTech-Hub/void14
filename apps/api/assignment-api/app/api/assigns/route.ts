import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createAssign,
  deleteAssign,
  updateAssign,
} from "../../../lib/api/assigns/mutations";
import {
  assignIdSchema,
  insertAssignParams,
  updateAssignParams,
} from "../../../lib/db/schema/assigns";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignParams.parse(await req.json());
    const { assign } = await createAssign(validatedData);

    revalidatePath("/assigns"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assign, { status: 201 });
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

    const validatedData = updateAssignParams.parse(await req.json());
    const validatedParams = assignIdSchema.parse({ id });

    const { assign } = await updateAssign(validatedParams.id, validatedData);

    return NextResponse.json(assign, { status: 200 });
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

    const validatedParams = assignIdSchema.parse({ id });
    const { assign } = await deleteAssign(validatedParams.id);

    return NextResponse.json(assign, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
