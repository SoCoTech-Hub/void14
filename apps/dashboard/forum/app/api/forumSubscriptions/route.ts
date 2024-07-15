import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createForumSubscription,
  deleteForumSubscription,
  updateForumSubscription,
} from "@soco/forum-api/forumSubscriptions/mutations";
import { 
  forumSubscriptionIdSchema,
  insertForumSubscriptionParams,
  updateForumSubscriptionParams 
} from "@soco/forum-db/schema/forumSubscriptions";

export async function POST(req: Request) {
  try {
    const validatedData = insertForumSubscriptionParams.parse(await req.json());
    const { forumSubscription } = await createForumSubscription(validatedData);

    revalidatePath("/forumSubscriptions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(forumSubscription, { status: 201 });
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

    const validatedData = updateForumSubscriptionParams.parse(await req.json());
    const validatedParams = forumSubscriptionIdSchema.parse({ id });

    const { forumSubscription } = await updateForumSubscription(validatedParams.id, validatedData);

    return NextResponse.json(forumSubscription, { status: 200 });
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

    const validatedParams = forumSubscriptionIdSchema.parse({ id });
    const { forumSubscription } = await deleteForumSubscription(validatedParams.id);

    return NextResponse.json(forumSubscription, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
