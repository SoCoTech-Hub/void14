import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createContent,
  deleteContent,
  updateContent,
} from "../../../lib/api/contents/mutations";
import {
  contentIdSchema,
  insertContentParams,
  updateContentParams,
} from "../../../lib/db/schema/contents";

export async function POST(req: Request) {
  try {
    const validatedData = insertContentParams.parse(await req.json());
    const { content } = await createContent(validatedData);

    revalidatePath("/contents"); // optional - assumes you will have named route same as entity

    return NextResponse.json(content, { status: 201 });
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

    const validatedData = updateContentParams.parse(await req.json());
    const validatedParams = contentIdSchema.parse({ id });

    const { content } = await updateContent(validatedParams.id, validatedData);

    return NextResponse.json(content, { status: 200 });
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

    const validatedParams = contentIdSchema.parse({ id });
    const { content } = await deleteContent(validatedParams.id);

    return NextResponse.json(content, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
