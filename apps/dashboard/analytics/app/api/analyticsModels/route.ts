import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAnalyticsModel,
  deleteAnalyticsModel,
  updateAnalyticsModel,
} from "@/lib/api/analyticsModels/mutations";
import { 
  analyticsModelIdSchema,
  insertAnalyticsModelParams,
  updateAnalyticsModelParams 
} from "@/lib/db/schema/analyticsModels";

export async function POST(req: Request) {
  try {
    const validatedData = insertAnalyticsModelParams.parse(await req.json());
    const { analyticsModel } = await createAnalyticsModel(validatedData);

    revalidatePath("/analyticsModels"); // optional - assumes you will have named route same as entity

    return NextResponse.json(analyticsModel, { status: 201 });
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

    const validatedData = updateAnalyticsModelParams.parse(await req.json());
    const validatedParams = analyticsModelIdSchema.parse({ id });

    const { analyticsModel } = await updateAnalyticsModel(validatedParams.id, validatedData);

    return NextResponse.json(analyticsModel, { status: 200 });
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

    const validatedParams = analyticsModelIdSchema.parse({ id });
    const { analyticsModel } = await deleteAnalyticsModel(validatedParams.id);

    return NextResponse.json(analyticsModel, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
