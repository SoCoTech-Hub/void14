import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createForumPost,
  deleteForumPost,
  updateForumPost,
} from "../../../lib/api/forumPosts/mutations";
import {
  forumPostIdSchema,
  insertForumPostParams,
  updateForumPostParams,
} from "../../../lib/db/schema/forumPosts";

export async function POST(req: Request) {
  try {
    const validatedData = insertForumPostParams.parse(await req.json());
    const { forumPost } = await createForumPost(validatedData);

    revalidatePath("/forumPosts"); // optional - assumes you will have named route same as entity

    return NextResponse.json(forumPost, { status: 201 });
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

    const validatedData = updateForumPostParams.parse(await req.json());
    const validatedParams = forumPostIdSchema.parse({ id });

    const { forumPost } = await updateForumPost(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(forumPost, { status: 200 });
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

    const validatedParams = forumPostIdSchema.parse({ id });
    const { forumPost } = await deleteForumPost(validatedParams.id);

    return NextResponse.json(forumPost, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
