import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createTagColl,
  deleteTagColl,
  updateTagColl,
} from "@/lib/api/tagColls/mutations";
import { 
  tagCollIdSchema,
  insertTagCollParams,
  updateTagCollParams 
} from "@/lib/db/schema/tagColls";

export async function POST(req: Request) {
  try {
    const validatedData = insertTagCollParams.parse(await req.json());
    const { tagColl } = await createTagColl(validatedData);

    revalidatePath("/tagColls"); // optional - assumes you will have named route same as entity

    return NextResponse.json(tagColl, { status: 201 });
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

    const validatedData = updateTagCollParams.parse(await req.json());
    const validatedParams = tagCollIdSchema.parse({ id });

    const { tagColl } = await updateTagColl(validatedParams.id, validatedData);

    return NextResponse.json(tagColl, { status: 200 });
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

    const validatedParams = tagCollIdSchema.parse({ id });
    const { tagColl } = await deleteTagColl(validatedParams.id);

    return NextResponse.json(tagColl, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
