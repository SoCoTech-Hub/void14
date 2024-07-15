import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createForumQueue,
  deleteForumQueue,
  updateForumQueue,
} from "@soco/forum-api/forumQueues/mutations";
import { 
  forumQueueIdSchema,
  insertForumQueueParams,
  updateForumQueueParams 
} from "@soco/forum-db/schema/forumQueues";

export async function POST(req: Request) {
  try {
    const validatedData = insertForumQueueParams.parse(await req.json());
    const { forumQueue } = await createForumQueue(validatedData);

    revalidatePath("/forumQueues"); // optional - assumes you will have named route same as entity

    return NextResponse.json(forumQueue, { status: 201 });
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

    const validatedData = updateForumQueueParams.parse(await req.json());
    const validatedParams = forumQueueIdSchema.parse({ id });

    const { forumQueue } = await updateForumQueue(validatedParams.id, validatedData);

    return NextResponse.json(forumQueue, { status: 200 });
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

    const validatedParams = forumQueueIdSchema.parse({ id });
    const { forumQueue } = await deleteForumQueue(validatedParams.id);

    return NextResponse.json(forumQueue, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
