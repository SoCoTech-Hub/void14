import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createFeedbackValuetmp,
  deleteFeedbackValuetmp,
  updateFeedbackValuetmp,
} from "@soco/feedback-api/feedbackValuetmps/mutations";
import { 
  feedbackValuetmpIdSchema,
  insertFeedbackValuetmpParams,
  updateFeedbackValuetmpParams 
} from "@soco/feedback-db/schema/feedbackValuetmps";

export async function POST(req: Request) {
  try {
    const validatedData = insertFeedbackValuetmpParams.parse(await req.json());
    const { feedbackValuetmp } = await createFeedbackValuetmp(validatedData);

    revalidatePath("/feedbackValuetmps"); // optional - assumes you will have named route same as entity

    return NextResponse.json(feedbackValuetmp, { status: 201 });
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

    const validatedData = updateFeedbackValuetmpParams.parse(await req.json());
    const validatedParams = feedbackValuetmpIdSchema.parse({ id });

    const { feedbackValuetmp } = await updateFeedbackValuetmp(validatedParams.id, validatedData);

    return NextResponse.json(feedbackValuetmp, { status: 200 });
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

    const validatedParams = feedbackValuetmpIdSchema.parse({ id });
    const { feedbackValuetmp } = await deleteFeedbackValuetmp(validatedParams.id);

    return NextResponse.json(feedbackValuetmp, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
