import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createFeedbackSitecourseMap,
  deleteFeedbackSitecourseMap,
  updateFeedbackSitecourseMap,
} from "../../../lib/api/feedbackSitecourseMaps/mutations";
import {
  feedbackSitecourseMapIdSchema,
  insertFeedbackSitecourseMapParams,
  updateFeedbackSitecourseMapParams,
} from "../../../lib/db/schema/feedbackSitecourseMaps";

export async function POST(req: Request) {
  try {
    const validatedData = insertFeedbackSitecourseMapParams.parse(
      await req.json(),
    );
    const { feedbackSitecourseMap } =
      await createFeedbackSitecourseMap(validatedData);

    revalidatePath("/feedbackSitecourseMaps"); // optional - assumes you will have named route same as entity

    return NextResponse.json(feedbackSitecourseMap, { status: 201 });
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

    const validatedData = updateFeedbackSitecourseMapParams.parse(
      await req.json(),
    );
    const validatedParams = feedbackSitecourseMapIdSchema.parse({ id });

    const { feedbackSitecourseMap } = await updateFeedbackSitecourseMap(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(feedbackSitecourseMap, { status: 200 });
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

    const validatedParams = feedbackSitecourseMapIdSchema.parse({ id });
    const { feedbackSitecourseMap } = await deleteFeedbackSitecourseMap(
      validatedParams.id,
    );

    return NextResponse.json(feedbackSitecourseMap, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
