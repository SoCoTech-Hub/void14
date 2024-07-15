import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createTag,
  deleteTag,
  updateTag,
} from "@soco/tag-api/tags/mutations";
import { 
  tagIdSchema,
  insertTagParams,
  updateTagParams 
} from "@soco/tag-db/schema/tags";

export async function POST(req: Request) {
  try {
    const validatedData = insertTagParams.parse(await req.json());
    const { tag } = await createTag(validatedData);

    revalidatePath("/tags"); // optional - assumes you will have named route same as entity

    return NextResponse.json(tag, { status: 201 });
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

    const validatedData = updateTagParams.parse(await req.json());
    const validatedParams = tagIdSchema.parse({ id });

    const { tag } = await updateTag(validatedParams.id, validatedData);

    return NextResponse.json(tag, { status: 200 });
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

    const validatedParams = tagIdSchema.parse({ id });
    const { tag } = await deleteTag(validatedParams.id);

    return NextResponse.json(tag, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
