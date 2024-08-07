import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createTagInstance,
  deleteTagInstance,
  updateTagInstance,
} from "@soco/tag-api/tagInstances/mutations";
import { 
  tagInstanceIdSchema,
  insertTagInstanceParams,
  updateTagInstanceParams 
} from "@soco/tag-db/schema/tagInstances";

export async function POST(req: Request) {
  try {
    const validatedData = insertTagInstanceParams.parse(await req.json());
    const { tagInstance } = await createTagInstance(validatedData);

    revalidatePath("/tagInstances"); // optional - assumes you will have named route same as entity

    return NextResponse.json(tagInstance, { status: 201 });
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

    const validatedData = updateTagInstanceParams.parse(await req.json());
    const validatedParams = tagInstanceIdSchema.parse({ id });

    const { tagInstance } = await updateTagInstance(validatedParams.id, validatedData);

    return NextResponse.json(tagInstance, { status: 200 });
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

    const validatedParams = tagInstanceIdSchema.parse({ id });
    const { tagInstance } = await deleteTagInstance(validatedParams.id);

    return NextResponse.json(tagInstance, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
