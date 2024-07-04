import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createForum,
  deleteForum,
  updateForum,
} from "../../../lib/api/forums/mutations";
import {
  forumIdSchema,
  insertForumParams,
  updateForumParams,
} from "../../../lib/db/schema/forums";

export async function POST(req: Request) {
  try {
    const validatedData = insertForumParams.parse(await req.json());
    const { forum } = await createForum(validatedData);

    revalidatePath("/forums"); // optional - assumes you will have named route same as entity

    return NextResponse.json(forum, { status: 201 });
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

    const validatedData = updateForumParams.parse(await req.json());
    const validatedParams = forumIdSchema.parse({ id });

    const { forum } = await updateForum(validatedParams.id, validatedData);

    return NextResponse.json(forum, { status: 200 });
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

    const validatedParams = forumIdSchema.parse({ id });
    const { forum } = await deleteForum(validatedParams.id);

    return NextResponse.json(forum, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
