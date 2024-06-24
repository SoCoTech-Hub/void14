import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGrade,
  deleteGrade,
  updateGrade,
} from "@/lib/api/grades/mutations";
import { 
  gradeIdSchema,
  insertGradeParams,
  updateGradeParams 
} from "@/lib/db/schema/grades";

export async function POST(req: Request) {
  try {
    const validatedData = insertGradeParams.parse(await req.json());
    const { grade } = await createGrade(validatedData);

    revalidatePath("/grades"); // optional - assumes you will have named route same as entity

    return NextResponse.json(grade, { status: 201 });
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

    const validatedData = updateGradeParams.parse(await req.json());
    const validatedParams = gradeIdSchema.parse({ id });

    const { grade } = await updateGrade(validatedParams.id, validatedData);

    return NextResponse.json(grade, { status: 200 });
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

    const validatedParams = gradeIdSchema.parse({ id });
    const { grade } = await deleteGrade(validatedParams.id);

    return NextResponse.json(grade, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
