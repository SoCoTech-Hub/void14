import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createFeedbackCompletedtmp,
  deleteFeedbackCompletedtmp,
  updateFeedbackCompletedtmp,
} from "@soco/feedback-api/feedbackCompletedtmps/mutations";
import { 
  feedbackCompletedtmpIdSchema,
  insertFeedbackCompletedtmpParams,
  updateFeedbackCompletedtmpParams 
} from "@soco/feedback-db/schema/feedbackCompletedtmps";

export async function POST(req: Request) {
  try {
    const validatedData = insertFeedbackCompletedtmpParams.parse(await req.json());
    const { feedbackCompletedtmp } = await createFeedbackCompletedtmp(validatedData);

    revalidatePath("/feedbackCompletedtmps"); // optional - assumes you will have named route same as entity

    return NextResponse.json(feedbackCompletedtmp, { status: 201 });
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

    const validatedData = updateFeedbackCompletedtmpParams.parse(await req.json());
    const validatedParams = feedbackCompletedtmpIdSchema.parse({ id });

    const { feedbackCompletedtmp } = await updateFeedbackCompletedtmp(validatedParams.id, validatedData);

    return NextResponse.json(feedbackCompletedtmp, { status: 200 });
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

    const validatedParams = feedbackCompletedtmpIdSchema.parse({ id });
    const { feedbackCompletedtmp } = await deleteFeedbackCompletedtmp(validatedParams.id);

    return NextResponse.json(feedbackCompletedtmp, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
