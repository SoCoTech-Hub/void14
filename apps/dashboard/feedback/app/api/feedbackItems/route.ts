import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createFeedbackItem,
  deleteFeedbackItem,
  updateFeedbackItem,
} from "@soco/feedback-api/feedbackItems/mutations";
import { 
  feedbackItemIdSchema,
  insertFeedbackItemParams,
  updateFeedbackItemParams 
} from "@soco/feedback-db/schema/feedbackItems";

export async function POST(req: Request) {
  try {
    const validatedData = insertFeedbackItemParams.parse(await req.json());
    const { feedbackItem } = await createFeedbackItem(validatedData);

    revalidatePath("/feedbackItems"); // optional - assumes you will have named route same as entity

    return NextResponse.json(feedbackItem, { status: 201 });
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

    const validatedData = updateFeedbackItemParams.parse(await req.json());
    const validatedParams = feedbackItemIdSchema.parse({ id });

    const { feedbackItem } = await updateFeedbackItem(validatedParams.id, validatedData);

    return NextResponse.json(feedbackItem, { status: 200 });
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

    const validatedParams = feedbackItemIdSchema.parse({ id });
    const { feedbackItem } = await deleteFeedbackItem(validatedParams.id);

    return NextResponse.json(feedbackItem, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
