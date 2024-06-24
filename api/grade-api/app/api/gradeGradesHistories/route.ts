import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGradeGradesHistory,
  deleteGradeGradesHistory,
  updateGradeGradesHistory,
} from "@/lib/api/gradeGradesHistories/mutations";
import { 
  gradeGradesHistoryIdSchema,
  insertGradeGradesHistoryParams,
  updateGradeGradesHistoryParams 
} from "@/lib/db/schema/gradeGradesHistories";

export async function POST(req: Request) {
  try {
    const validatedData = insertGradeGradesHistoryParams.parse(await req.json());
    const { gradeGradesHistory } = await createGradeGradesHistory(validatedData);

    revalidatePath("/gradeGradesHistories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(gradeGradesHistory, { status: 201 });
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

    const validatedData = updateGradeGradesHistoryParams.parse(await req.json());
    const validatedParams = gradeGradesHistoryIdSchema.parse({ id });

    const { gradeGradesHistory } = await updateGradeGradesHistory(validatedParams.id, validatedData);

    return NextResponse.json(gradeGradesHistory, { status: 200 });
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

    const validatedParams = gradeGradesHistoryIdSchema.parse({ id });
    const { gradeGradesHistory } = await deleteGradeGradesHistory(validatedParams.id);

    return NextResponse.json(gradeGradesHistory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
