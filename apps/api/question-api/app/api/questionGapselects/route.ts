import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createQuestionGapselect,
  deleteQuestionGapselect,
  updateQuestionGapselect,
} from "../../../lib/api/questionGapselects/mutations";
import {
  insertQuestionGapselectParams,
  questionGapselectIdSchema,
  updateQuestionGapselectParams,
} from "../../../lib/db/schema/questionGapselects";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionGapselectParams.parse(await req.json());
    const { questionGapselect } = await createQuestionGapselect(validatedData);

    revalidatePath("/questionGapselects"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionGapselect, { status: 201 });
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

    const validatedData = updateQuestionGapselectParams.parse(await req.json());
    const validatedParams = questionGapselectIdSchema.parse({ id });

    const { questionGapselect } = await updateQuestionGapselect(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(questionGapselect, { status: 200 });
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

    const validatedParams = questionGapselectIdSchema.parse({ id });
    const { questionGapselect } = await deleteQuestionGapselect(
      validatedParams.id,
    );

    return NextResponse.json(questionGapselect, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
