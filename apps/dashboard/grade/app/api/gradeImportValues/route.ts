import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGradeImportValue,
  deleteGradeImportValue,
  updateGradeImportValue,
} from "@soco/grade-api/gradeImportValues/mutations";
import { 
  gradeImportValueIdSchema,
  insertGradeImportValueParams,
  updateGradeImportValueParams 
} from "@soco/grade-db/schema/gradeImportValues";

export async function POST(req: Request) {
  try {
    const validatedData = insertGradeImportValueParams.parse(await req.json());
    const { gradeImportValue } = await createGradeImportValue(validatedData);

    revalidatePath("/gradeImportValues"); // optional - assumes you will have named route same as entity

    return NextResponse.json(gradeImportValue, { status: 201 });
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

    const validatedData = updateGradeImportValueParams.parse(await req.json());
    const validatedParams = gradeImportValueIdSchema.parse({ id });

    const { gradeImportValue } = await updateGradeImportValue(validatedParams.id, validatedData);

    return NextResponse.json(gradeImportValue, { status: 200 });
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

    const validatedParams = gradeImportValueIdSchema.parse({ id });
    const { gradeImportValue } = await deleteGradeImportValue(validatedParams.id);

    return NextResponse.json(gradeImportValue, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
