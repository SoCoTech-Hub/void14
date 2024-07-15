import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createForumRead,
  deleteForumRead,
  updateForumRead,
} from "@soco/forum-api/forumReads/mutations";
import { 
  forumReadIdSchema,
  insertForumReadParams,
  updateForumReadParams 
} from "@soco/forum-db/schema/forumReads";

export async function POST(req: Request) {
  try {
    const validatedData = insertForumReadParams.parse(await req.json());
    const { forumRead } = await createForumRead(validatedData);

    revalidatePath("/forumReads"); // optional - assumes you will have named route same as entity

    return NextResponse.json(forumRead, { status: 201 });
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

    const validatedData = updateForumReadParams.parse(await req.json());
    const validatedParams = forumReadIdSchema.parse({ id });

    const { forumRead } = await updateForumRead(validatedParams.id, validatedData);

    return NextResponse.json(forumRead, { status: 200 });
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

    const validatedParams = forumReadIdSchema.parse({ id });
    const { forumRead } = await deleteForumRead(validatedParams.id);

    return NextResponse.json(forumRead, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
