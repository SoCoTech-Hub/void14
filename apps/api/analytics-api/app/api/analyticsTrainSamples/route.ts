import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createAnalyticsTrainSample,
  deleteAnalyticsTrainSample,
  updateAnalyticsTrainSample,
} from "../../../lib/api/analyticsTrainSamples/mutations";
import {
  analyticsTrainSampleIdSchema,
  insertAnalyticsTrainSampleParams,
  updateAnalyticsTrainSampleParams,
} from "../../../lib/db/schema/analyticsTrainSamples";

export async function POST(req: Request) {
  try {
    const validatedData = insertAnalyticsTrainSampleParams.parse(
      await req.json(),
    );
    const { analyticsTrainSample } =
      await createAnalyticsTrainSample(validatedData);

    revalidatePath("/analyticsTrainSamples"); // optional - assumes you will have named route same as entity

    return NextResponse.json(analyticsTrainSample, { status: 201 });
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

    const validatedData = updateAnalyticsTrainSampleParams.parse(
      await req.json(),
    );
    const validatedParams = analyticsTrainSampleIdSchema.parse({ id });

    const { analyticsTrainSample } = await updateAnalyticsTrainSample(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(analyticsTrainSample, { status: 200 });
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

    const validatedParams = analyticsTrainSampleIdSchema.parse({ id });
    const { analyticsTrainSample } = await deleteAnalyticsTrainSample(
      validatedParams.id,
    );

    return NextResponse.json(analyticsTrainSample, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
