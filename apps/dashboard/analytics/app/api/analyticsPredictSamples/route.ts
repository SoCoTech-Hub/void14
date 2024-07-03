import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAnalyticsPredictSample,
  deleteAnalyticsPredictSample,
  updateAnalyticsPredictSample,
} from "@/lib/api/analyticsPredictSamples/mutations";
import { 
  analyticsPredictSampleIdSchema,
  insertAnalyticsPredictSampleParams,
  updateAnalyticsPredictSampleParams 
} from "@/lib/db/schema/analyticsPredictSamples";

export async function POST(req: Request) {
  try {
    const validatedData = insertAnalyticsPredictSampleParams.parse(await req.json());
    const { analyticsPredictSample } = await createAnalyticsPredictSample(validatedData);

    revalidatePath("/analyticsPredictSamples"); // optional - assumes you will have named route same as entity

    return NextResponse.json(analyticsPredictSample, { status: 201 });
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

    const validatedData = updateAnalyticsPredictSampleParams.parse(await req.json());
    const validatedParams = analyticsPredictSampleIdSchema.parse({ id });

    const { analyticsPredictSample } = await updateAnalyticsPredictSample(validatedParams.id, validatedData);

    return NextResponse.json(analyticsPredictSample, { status: 200 });
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

    const validatedParams = analyticsPredictSampleIdSchema.parse({ id });
    const { analyticsPredictSample } = await deleteAnalyticsPredictSample(validatedParams.id);

    return NextResponse.json(analyticsPredictSample, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
