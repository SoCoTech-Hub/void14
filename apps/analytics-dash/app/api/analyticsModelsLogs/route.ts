import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAnalyticsModelsLog,
  deleteAnalyticsModelsLog,
  updateAnalyticsModelsLog,
} from "@/lib/api/analyticsModelsLogs/mutations";
import { 
  analyticsModelsLogIdSchema,
  insertAnalyticsModelsLogParams,
  updateAnalyticsModelsLogParams 
} from "@/lib/db/schema/analyticsModelsLogs";

export async function POST(req: Request) {
  try {
    const validatedData = insertAnalyticsModelsLogParams.parse(await req.json());
    const { analyticsModelsLog } = await createAnalyticsModelsLog(validatedData);

    revalidatePath("/analyticsModelsLogs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(analyticsModelsLog, { status: 201 });
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

    const validatedData = updateAnalyticsModelsLogParams.parse(await req.json());
    const validatedParams = analyticsModelsLogIdSchema.parse({ id });

    const { analyticsModelsLog } = await updateAnalyticsModelsLog(validatedParams.id, validatedData);

    return NextResponse.json(analyticsModelsLog, { status: 200 });
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

    const validatedParams = analyticsModelsLogIdSchema.parse({ id });
    const { analyticsModelsLog } = await deleteAnalyticsModelsLog(validatedParams.id);

    return NextResponse.json(analyticsModelsLog, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
