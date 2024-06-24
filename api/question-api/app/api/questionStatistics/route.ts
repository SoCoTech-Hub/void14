import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuestionStatistic,
  deleteQuestionStatistic,
  updateQuestionStatistic,
} from "@/lib/api/questionStatistics/mutations";
import { 
  questionStatisticIdSchema,
  insertQuestionStatisticParams,
  updateQuestionStatisticParams 
} from "@/lib/db/schema/questionStatistics";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionStatisticParams.parse(await req.json());
    const { questionStatistic } = await createQuestionStatistic(validatedData);

    revalidatePath("/questionStatistics"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionStatistic, { status: 201 });
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

    const validatedData = updateQuestionStatisticParams.parse(await req.json());
    const validatedParams = questionStatisticIdSchema.parse({ id });

    const { questionStatistic } = await updateQuestionStatistic(validatedParams.id, validatedData);

    return NextResponse.json(questionStatistic, { status: 200 });
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

    const validatedParams = questionStatisticIdSchema.parse({ id });
    const { questionStatistic } = await deleteQuestionStatistic(validatedParams.id);

    return NextResponse.json(questionStatistic, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
