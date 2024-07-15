import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuestionCalculated,
  deleteQuestionCalculated,
  updateQuestionCalculated,
} from "@soco/question-api/questionCalculateds/mutations";
import { 
  questionCalculatedIdSchema,
  insertQuestionCalculatedParams,
  updateQuestionCalculatedParams 
} from "@soco/question-db/schema/questionCalculateds";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionCalculatedParams.parse(await req.json());
    const { questionCalculated } = await createQuestionCalculated(validatedData);

    revalidatePath("/questionCalculateds"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionCalculated, { status: 201 });
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

    const validatedData = updateQuestionCalculatedParams.parse(await req.json());
    const validatedParams = questionCalculatedIdSchema.parse({ id });

    const { questionCalculated } = await updateQuestionCalculated(validatedParams.id, validatedData);

    return NextResponse.json(questionCalculated, { status: 200 });
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

    const validatedParams = questionCalculatedIdSchema.parse({ id });
    const { questionCalculated } = await deleteQuestionCalculated(validatedParams.id);

    return NextResponse.json(questionCalculated, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
