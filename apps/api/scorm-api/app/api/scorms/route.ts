import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createScorm,
  deleteScorm,
  updateScorm,
} from "../../../lib/api/scorms/mutations";
import {
  insertScormParams,
  scormIdSchema,
  updateScormParams,
} from "../../../lib/db/schema/scorms";

export async function POST(req: Request) {
  try {
    const validatedData = insertScormParams.parse(await req.json());
    const { scorm } = await createScorm(validatedData);

    revalidatePath("/scorms"); // optional - assumes you will have named route same as entity

    return NextResponse.json(scorm, { status: 201 });
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

    const validatedData = updateScormParams.parse(await req.json());
    const validatedParams = scormIdSchema.parse({ id });

    const { scorm } = await updateScorm(validatedParams.id, validatedData);

    return NextResponse.json(scorm, { status: 200 });
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

    const validatedParams = scormIdSchema.parse({ id });
    const { scorm } = await deleteScorm(validatedParams.id);

    return NextResponse.json(scorm, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
