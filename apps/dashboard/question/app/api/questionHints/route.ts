import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuestionHint,
  deleteQuestionHint,
  updateQuestionHint,
} from "@/lib/api/questionHints/mutations";
import { 
  questionHintIdSchema,
  insertQuestionHintParams,
  updateQuestionHintParams 
} from "@/lib/db/schema/questionHints";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionHintParams.parse(await req.json());
    const { questionHint } = await createQuestionHint(validatedData);

    revalidatePath("/questionHints"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionHint, { status: 201 });
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

    const validatedData = updateQuestionHintParams.parse(await req.json());
    const validatedParams = questionHintIdSchema.parse({ id });

    const { questionHint } = await updateQuestionHint(validatedParams.id, validatedData);

    return NextResponse.json(questionHint, { status: 200 });
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

    const validatedParams = questionHintIdSchema.parse({ id });
    const { questionHint } = await deleteQuestionHint(validatedParams.id);

    return NextResponse.json(questionHint, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
