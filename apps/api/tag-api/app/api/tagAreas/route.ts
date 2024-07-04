import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createTagArea,
  deleteTagArea,
  updateTagArea,
} from "../../../lib/api/tagAreas/mutations";
import {
  insertTagAreaParams,
  tagAreaIdSchema,
  updateTagAreaParams,
} from "../../../lib/db/schema/tagAreas";

export async function POST(req: Request) {
  try {
    const validatedData = insertTagAreaParams.parse(await req.json());
    const { tagArea } = await createTagArea(validatedData);

    revalidatePath("/tagAreas"); // optional - assumes you will have named route same as entity

    return NextResponse.json(tagArea, { status: 201 });
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

    const validatedData = updateTagAreaParams.parse(await req.json());
    const validatedParams = tagAreaIdSchema.parse({ id });

    const { tagArea } = await updateTagArea(validatedParams.id, validatedData);

    return NextResponse.json(tagArea, { status: 200 });
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

    const validatedParams = tagAreaIdSchema.parse({ id });
    const { tagArea } = await deleteTagArea(validatedParams.id);

    return NextResponse.json(tagArea, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
