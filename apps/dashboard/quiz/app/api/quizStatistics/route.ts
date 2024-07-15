import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuizStatistic,
  deleteQuizStatistic,
  updateQuizStatistic,
} from "@soco/quiz-api/quizStatistics/mutations";
import { 
  quizStatisticIdSchema,
  insertQuizStatisticParams,
  updateQuizStatisticParams 
} from "@soco/quiz-db/schema/quizStatistics";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuizStatisticParams.parse(await req.json());
    const { quizStatistic } = await createQuizStatistic(validatedData);

    revalidatePath("/quizStatistics"); // optional - assumes you will have named route same as entity

    return NextResponse.json(quizStatistic, { status: 201 });
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

    const validatedData = updateQuizStatisticParams.parse(await req.json());
    const validatedParams = quizStatisticIdSchema.parse({ id });

    const { quizStatistic } = await updateQuizStatistic(validatedParams.id, validatedData);

    return NextResponse.json(quizStatistic, { status: 200 });
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

    const validatedParams = quizStatisticIdSchema.parse({ id });
    const { quizStatistic } = await deleteQuizStatistic(validatedParams.id);

    return NextResponse.json(quizStatistic, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
