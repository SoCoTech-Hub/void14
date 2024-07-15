import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuizAttempt,
  deleteQuizAttempt,
  updateQuizAttempt,
} from "@soco/quiz-api/quizAttempts/mutations";
import { 
  quizAttemptIdSchema,
  insertQuizAttemptParams,
  updateQuizAttemptParams 
} from "@soco/quiz-db/schema/quizAttempts";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuizAttemptParams.parse(await req.json());
    const { quizAttempt } = await createQuizAttempt(validatedData);

    revalidatePath("/quizAttempts"); // optional - assumes you will have named route same as entity

    return NextResponse.json(quizAttempt, { status: 201 });
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

    const validatedData = updateQuizAttemptParams.parse(await req.json());
    const validatedParams = quizAttemptIdSchema.parse({ id });

    const { quizAttempt } = await updateQuizAttempt(validatedParams.id, validatedData);

    return NextResponse.json(quizAttempt, { status: 200 });
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

    const validatedParams = quizAttemptIdSchema.parse({ id });
    const { quizAttempt } = await deleteQuizAttempt(validatedParams.id);

    return NextResponse.json(quizAttempt, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
