import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGradeItemsHistory,
  deleteGradeItemsHistory,
  updateGradeItemsHistory,
} from "@/lib/api/gradeItemsHistories/mutations";
import { 
  gradeItemsHistoryIdSchema,
  insertGradeItemsHistoryParams,
  updateGradeItemsHistoryParams 
} from "@/lib/db/schema/gradeItemsHistories";

export async function POST(req: Request) {
  try {
    const validatedData = insertGradeItemsHistoryParams.parse(await req.json());
    const { gradeItemsHistory } = await createGradeItemsHistory(validatedData);

    revalidatePath("/gradeItemsHistories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(gradeItemsHistory, { status: 201 });
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

    const validatedData = updateGradeItemsHistoryParams.parse(await req.json());
    const validatedParams = gradeItemsHistoryIdSchema.parse({ id });

    const { gradeItemsHistory } = await updateGradeItemsHistory(validatedParams.id, validatedData);

    return NextResponse.json(gradeItemsHistory, { status: 200 });
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

    const validatedParams = gradeItemsHistoryIdSchema.parse({ id });
    const { gradeItemsHistory } = await deleteGradeItemsHistory(validatedParams.id);

    return NextResponse.json(gradeItemsHistory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
