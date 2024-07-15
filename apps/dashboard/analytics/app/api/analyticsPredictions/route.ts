import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAnalyticsPrediction,
  deleteAnalyticsPrediction,
  updateAnalyticsPrediction,
} from "@soco/analytics-api/analyticsPredictions/mutations";
import { 
  analyticsPredictionIdSchema,
  insertAnalyticsPredictionParams,
  updateAnalyticsPredictionParams 
} from "@soco/analytics-db/schema/analyticsPredictions";

export async function POST(req: Request) {
  try {
    const validatedData = insertAnalyticsPredictionParams.parse(await req.json());
    const { analyticsPrediction } = await createAnalyticsPrediction(validatedData);

    revalidatePath("/analyticsPredictions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(analyticsPrediction, { status: 201 });
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

    const validatedData = updateAnalyticsPredictionParams.parse(await req.json());
    const validatedParams = analyticsPredictionIdSchema.parse({ id });

    const { analyticsPrediction } = await updateAnalyticsPrediction(validatedParams.id, validatedData);

    return NextResponse.json(analyticsPrediction, { status: 200 });
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

    const validatedParams = analyticsPredictionIdSchema.parse({ id });
    const { analyticsPrediction } = await deleteAnalyticsPrediction(validatedParams.id);

    return NextResponse.json(analyticsPrediction, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
