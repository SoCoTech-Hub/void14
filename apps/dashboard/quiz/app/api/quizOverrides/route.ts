import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuizOverride,
  deleteQuizOverride,
  updateQuizOverride,
} from "@soco/quiz-api/quizOverrides/mutations";
import { 
  quizOverrideIdSchema,
  insertQuizOverrideParams,
  updateQuizOverrideParams 
} from "@soco/quiz-db/schema/quizOverrides";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuizOverrideParams.parse(await req.json());
    const { quizOverride } = await createQuizOverride(validatedData);

    revalidatePath("/quizOverrides"); // optional - assumes you will have named route same as entity

    return NextResponse.json(quizOverride, { status: 201 });
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

    const validatedData = updateQuizOverrideParams.parse(await req.json());
    const validatedParams = quizOverrideIdSchema.parse({ id });

    const { quizOverride } = await updateQuizOverride(validatedParams.id, validatedData);

    return NextResponse.json(quizOverride, { status: 200 });
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

    const validatedParams = quizOverrideIdSchema.parse({ id });
    const { quizOverride } = await deleteQuizOverride(validatedParams.id);

    return NextResponse.json(quizOverride, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
