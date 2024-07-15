import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAnalyticsPredictionAction,
  deleteAnalyticsPredictionAction,
  updateAnalyticsPredictionAction,
} from "@soco/analytics-api/analyticsPredictionActions/mutations";
import { 
  analyticsPredictionActionIdSchema,
  insertAnalyticsPredictionActionParams,
  updateAnalyticsPredictionActionParams 
} from "@soco/analytics-db/schema/analyticsPredictionActions";

export async function POST(req: Request) {
  try {
    const validatedData = insertAnalyticsPredictionActionParams.parse(await req.json());
    const { analyticsPredictionAction } = await createAnalyticsPredictionAction(validatedData);

    revalidatePath("/analyticsPredictionActions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(analyticsPredictionAction, { status: 201 });
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

    const validatedData = updateAnalyticsPredictionActionParams.parse(await req.json());
    const validatedParams = analyticsPredictionActionIdSchema.parse({ id });

    const { analyticsPredictionAction } = await updateAnalyticsPredictionAction(validatedParams.id, validatedData);

    return NextResponse.json(analyticsPredictionAction, { status: 200 });
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

    const validatedParams = analyticsPredictionActionIdSchema.parse({ id });
    const { analyticsPredictionAction } = await deleteAnalyticsPredictionAction(validatedParams.id);

    return NextResponse.json(analyticsPredictionAction, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
