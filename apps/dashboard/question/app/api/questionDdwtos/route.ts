import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuestionDdwto,
  deleteQuestionDdwto,
  updateQuestionDdwto,
} from "@soco/question-api/questionDdwtos/mutations";
import { 
  questionDdwtoIdSchema,
  insertQuestionDdwtoParams,
  updateQuestionDdwtoParams 
} from "@soco/question-db/schema/questionDdwtos";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionDdwtoParams.parse(await req.json());
    const { questionDdwto } = await createQuestionDdwto(validatedData);

    revalidatePath("/questionDdwtos"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionDdwto, { status: 201 });
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

    const validatedData = updateQuestionDdwtoParams.parse(await req.json());
    const validatedParams = questionDdwtoIdSchema.parse({ id });

    const { questionDdwto } = await updateQuestionDdwto(validatedParams.id, validatedData);

    return NextResponse.json(questionDdwto, { status: 200 });
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

    const validatedParams = questionDdwtoIdSchema.parse({ id });
    const { questionDdwto } = await deleteQuestionDdwto(validatedParams.id);

    return NextResponse.json(questionDdwto, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
