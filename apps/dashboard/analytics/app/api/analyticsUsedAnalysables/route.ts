import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAnalyticsUsedAnalysable,
  deleteAnalyticsUsedAnalysable,
  updateAnalyticsUsedAnalysable,
} from "@soco/analytics-api/analyticsUsedAnalysables/mutations";
import { 
  analyticsUsedAnalysableIdSchema,
  insertAnalyticsUsedAnalysableParams,
  updateAnalyticsUsedAnalysableParams 
} from "@soco/analytics-db/schema/analyticsUsedAnalysables";

export async function POST(req: Request) {
  try {
    const validatedData = insertAnalyticsUsedAnalysableParams.parse(await req.json());
    const { analyticsUsedAnalysable } = await createAnalyticsUsedAnalysable(validatedData);

    revalidatePath("/analyticsUsedAnalysables"); // optional - assumes you will have named route same as entity

    return NextResponse.json(analyticsUsedAnalysable, { status: 201 });
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

    const validatedData = updateAnalyticsUsedAnalysableParams.parse(await req.json());
    const validatedParams = analyticsUsedAnalysableIdSchema.parse({ id });

    const { analyticsUsedAnalysable } = await updateAnalyticsUsedAnalysable(validatedParams.id, validatedData);

    return NextResponse.json(analyticsUsedAnalysable, { status: 200 });
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

    const validatedParams = analyticsUsedAnalysableIdSchema.parse({ id });
    const { analyticsUsedAnalysable } = await deleteAnalyticsUsedAnalysable(validatedParams.id);

    return NextResponse.json(analyticsUsedAnalysable, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
