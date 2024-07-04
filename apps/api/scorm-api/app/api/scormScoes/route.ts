import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createScormScoe,
  deleteScormScoe,
  updateScormScoe,
} from "../../../lib/api/scormScoes/mutations";
import {
  insertScormScoeParams,
  scormScoeIdSchema,
  updateScormScoeParams,
} from "../../../lib/db/schema/scormScoes";

export async function POST(req: Request) {
  try {
    const validatedData = insertScormScoeParams.parse(await req.json());
    const { scormScoe } = await createScormScoe(validatedData);

    revalidatePath("/scormScoes"); // optional - assumes you will have named route same as entity

    return NextResponse.json(scormScoe, { status: 201 });
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

    const validatedData = updateScormScoeParams.parse(await req.json());
    const validatedParams = scormScoeIdSchema.parse({ id });

    const { scormScoe } = await updateScormScoe(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(scormScoe, { status: 200 });
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

    const validatedParams = scormScoeIdSchema.parse({ id });
    const { scormScoe } = await deleteScormScoe(validatedParams.id);

    return NextResponse.json(scormScoe, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
