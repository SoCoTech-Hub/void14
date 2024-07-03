import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createFeedbackCompleted,
  deleteFeedbackCompleted,
  updateFeedbackCompleted,
} from "@/lib/api/feedbackCompleteds/mutations";
import { 
  feedbackCompletedIdSchema,
  insertFeedbackCompletedParams,
  updateFeedbackCompletedParams 
} from "@/lib/db/schema/feedbackCompleteds";

export async function POST(req: Request) {
  try {
    const validatedData = insertFeedbackCompletedParams.parse(await req.json());
    const { feedbackCompleted } = await createFeedbackCompleted(validatedData);

    revalidatePath("/feedbackCompleteds"); // optional - assumes you will have named route same as entity

    return NextResponse.json(feedbackCompleted, { status: 201 });
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

    const validatedData = updateFeedbackCompletedParams.parse(await req.json());
    const validatedParams = feedbackCompletedIdSchema.parse({ id });

    const { feedbackCompleted } = await updateFeedbackCompleted(validatedParams.id, validatedData);

    return NextResponse.json(feedbackCompleted, { status: 200 });
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

    const validatedParams = feedbackCompletedIdSchema.parse({ id });
    const { feedbackCompleted } = await deleteFeedbackCompleted(validatedParams.id);

    return NextResponse.json(feedbackCompleted, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
