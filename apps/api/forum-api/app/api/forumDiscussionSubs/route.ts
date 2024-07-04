import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createForumDiscussionSub,
  deleteForumDiscussionSub,
  updateForumDiscussionSub,
} from "../../../lib/api/forumDiscussionSubs/mutations";
import {
  forumDiscussionSubIdSchema,
  insertForumDiscussionSubParams,
  updateForumDiscussionSubParams,
} from "../../../lib/db/schema/forumDiscussionSubs";

export async function POST(req: Request) {
  try {
    const validatedData = insertForumDiscussionSubParams.parse(
      await req.json(),
    );
    const { forumDiscussionSub } =
      await createForumDiscussionSub(validatedData);

    revalidatePath("/forumDiscussionSubs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(forumDiscussionSub, { status: 201 });
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

    const validatedData = updateForumDiscussionSubParams.parse(
      await req.json(),
    );
    const validatedParams = forumDiscussionSubIdSchema.parse({ id });

    const { forumDiscussionSub } = await updateForumDiscussionSub(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(forumDiscussionSub, { status: 200 });
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

    const validatedParams = forumDiscussionSubIdSchema.parse({ id });
    const { forumDiscussionSub } = await deleteForumDiscussionSub(
      validatedParams.id,
    );

    return NextResponse.json(forumDiscussionSub, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
