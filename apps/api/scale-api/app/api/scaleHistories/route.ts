import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createScaleHistory,
  deleteScaleHistory,
  updateScaleHistory,
} from "../../../lib/api/scaleHistories/mutations";
import {
  insertScaleHistoryParams,
  scaleHistoryIdSchema,
  updateScaleHistoryParams,
} from "../../../lib/db/schema/scaleHistories";

export async function POST(req: Request) {
  try {
    const validatedData = insertScaleHistoryParams.parse(await req.json());
    const { scaleHistory } = await createScaleHistory(validatedData);

    revalidatePath("/scaleHistories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(scaleHistory, { status: 201 });
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

    const validatedData = updateScaleHistoryParams.parse(await req.json());
    const validatedParams = scaleHistoryIdSchema.parse({ id });

    const { scaleHistory } = await updateScaleHistory(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(scaleHistory, { status: 200 });
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

    const validatedParams = scaleHistoryIdSchema.parse({ id });
    const { scaleHistory } = await deleteScaleHistory(validatedParams.id);

    return NextResponse.json(scaleHistory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
