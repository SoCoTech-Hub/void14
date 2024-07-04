import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createQuestionResponseCount,
  deleteQuestionResponseCount,
  updateQuestionResponseCount,
} from "../../../lib/api/questionResponseCounts/mutations";
import {
  insertQuestionResponseCountParams,
  questionResponseCountIdSchema,
  updateQuestionResponseCountParams,
} from "../../../lib/db/schema/questionResponseCounts";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionResponseCountParams.parse(
      await req.json(),
    );
    const { questionResponseCount } =
      await createQuestionResponseCount(validatedData);

    revalidatePath("/questionResponseCounts"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionResponseCount, { status: 201 });
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

    const validatedData = updateQuestionResponseCountParams.parse(
      await req.json(),
    );
    const validatedParams = questionResponseCountIdSchema.parse({ id });

    const { questionResponseCount } = await updateQuestionResponseCount(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(questionResponseCount, { status: 200 });
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

    const validatedParams = questionResponseCountIdSchema.parse({ id });
    const { questionResponseCount } = await deleteQuestionResponseCount(
      validatedParams.id,
    );

    return NextResponse.json(questionResponseCount, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
