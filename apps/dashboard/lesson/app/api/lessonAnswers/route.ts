import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createLessonAnswer,
  deleteLessonAnswer,
  updateLessonAnswer,
} from "@soco/lesson-api/lessonAnswers/mutations";
import { 
  lessonAnswerIdSchema,
  insertLessonAnswerParams,
  updateLessonAnswerParams 
} from "@soco/lesson-db/schema/lessonAnswers";

export async function POST(req: Request) {
  try {
    const validatedData = insertLessonAnswerParams.parse(await req.json());
    const { lessonAnswer } = await createLessonAnswer(validatedData);

    revalidatePath("/lessonAnswers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(lessonAnswer, { status: 201 });
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

    const validatedData = updateLessonAnswerParams.parse(await req.json());
    const validatedParams = lessonAnswerIdSchema.parse({ id });

    const { lessonAnswer } = await updateLessonAnswer(validatedParams.id, validatedData);

    return NextResponse.json(lessonAnswer, { status: 200 });
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

    const validatedParams = lessonAnswerIdSchema.parse({ id });
    const { lessonAnswer } = await deleteLessonAnswer(validatedParams.id);

    return NextResponse.json(lessonAnswer, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
