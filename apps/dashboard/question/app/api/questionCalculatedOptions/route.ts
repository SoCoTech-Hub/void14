import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuestionCalculatedOption,
  deleteQuestionCalculatedOption,
  updateQuestionCalculatedOption,
} from "@soco/question-api/questionCalculatedOptions/mutations";
import { 
  questionCalculatedOptionIdSchema,
  insertQuestionCalculatedOptionParams,
  updateQuestionCalculatedOptionParams 
} from "@soco/question-db/schema/questionCalculatedOptions";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionCalculatedOptionParams.parse(await req.json());
    const { questionCalculatedOption } = await createQuestionCalculatedOption(validatedData);

    revalidatePath("/questionCalculatedOptions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionCalculatedOption, { status: 201 });
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

    const validatedData = updateQuestionCalculatedOptionParams.parse(await req.json());
    const validatedParams = questionCalculatedOptionIdSchema.parse({ id });

    const { questionCalculatedOption } = await updateQuestionCalculatedOption(validatedParams.id, validatedData);

    return NextResponse.json(questionCalculatedOption, { status: 200 });
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

    const validatedParams = questionCalculatedOptionIdSchema.parse({ id });
    const { questionCalculatedOption } = await deleteQuestionCalculatedOption(validatedParams.id);

    return NextResponse.json(questionCalculatedOption, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
