import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createForumDiscussion,
  deleteForumDiscussion,
  updateForumDiscussion,
} from "@/lib/api/forumDiscussions/mutations";
import { 
  forumDiscussionIdSchema,
  insertForumDiscussionParams,
  updateForumDiscussionParams 
} from "@/lib/db/schema/forumDiscussions";

export async function POST(req: Request) {
  try {
    const validatedData = insertForumDiscussionParams.parse(await req.json());
    const { forumDiscussion } = await createForumDiscussion(validatedData);

    revalidatePath("/forumDiscussions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(forumDiscussion, { status: 201 });
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

    const validatedData = updateForumDiscussionParams.parse(await req.json());
    const validatedParams = forumDiscussionIdSchema.parse({ id });

    const { forumDiscussion } = await updateForumDiscussion(validatedParams.id, validatedData);

    return NextResponse.json(forumDiscussion, { status: 200 });
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

    const validatedParams = forumDiscussionIdSchema.parse({ id });
    const { forumDiscussion } = await deleteForumDiscussion(validatedParams.id);

    return NextResponse.json(forumDiscussion, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
