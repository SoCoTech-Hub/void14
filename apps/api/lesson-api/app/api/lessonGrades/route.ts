import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createLessonGrade,
  deleteLessonGrade,
  updateLessonGrade,
} from "../../../lib/api/lessonGrades/mutations";
import {
  insertLessonGradeParams,
  lessonGradeIdSchema,
  updateLessonGradeParams,
} from "../../../lib/db/schema/lessonGrades";

export async function POST(req: Request) {
  try {
    const validatedData = insertLessonGradeParams.parse(await req.json());
    const { lessonGrade } = await createLessonGrade(validatedData);

    revalidatePath("/lessonGrades"); // optional - assumes you will have named route same as entity

    return NextResponse.json(lessonGrade, { status: 201 });
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

    const validatedData = updateLessonGradeParams.parse(await req.json());
    const validatedParams = lessonGradeIdSchema.parse({ id });

    const { lessonGrade } = await updateLessonGrade(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(lessonGrade, { status: 200 });
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

    const validatedParams = lessonGradeIdSchema.parse({ id });
    const { lessonGrade } = await deleteLessonGrade(validatedParams.id);

    return NextResponse.json(lessonGrade, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
