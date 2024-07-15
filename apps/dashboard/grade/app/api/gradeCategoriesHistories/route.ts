import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGradeCategoriesHistory,
  deleteGradeCategoriesHistory,
  updateGradeCategoriesHistory,
} from "@soco/grade-api/gradeCategoriesHistories/mutations";
import { 
  gradeCategoriesHistoryIdSchema,
  insertGradeCategoriesHistoryParams,
  updateGradeCategoriesHistoryParams 
} from "@soco/grade-db/schema/gradeCategoriesHistories";

export async function POST(req: Request) {
  try {
    const validatedData = insertGradeCategoriesHistoryParams.parse(await req.json());
    const { gradeCategoriesHistory } = await createGradeCategoriesHistory(validatedData);

    revalidatePath("/gradeCategoriesHistories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(gradeCategoriesHistory, { status: 201 });
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

    const validatedData = updateGradeCategoriesHistoryParams.parse(await req.json());
    const validatedParams = gradeCategoriesHistoryIdSchema.parse({ id });

    const { gradeCategoriesHistory } = await updateGradeCategoriesHistory(validatedParams.id, validatedData);

    return NextResponse.json(gradeCategoriesHistory, { status: 200 });
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

    const validatedParams = gradeCategoriesHistoryIdSchema.parse({ id });
    const { gradeCategoriesHistory } = await deleteGradeCategoriesHistory(validatedParams.id);

    return NextResponse.json(gradeCategoriesHistory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
