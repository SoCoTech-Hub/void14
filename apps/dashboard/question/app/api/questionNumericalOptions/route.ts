import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuestionNumericalOption,
  deleteQuestionNumericalOption,
  updateQuestionNumericalOption,
} from "@soco/question-api/questionNumericalOptions/mutations";
import { 
  questionNumericalOptionIdSchema,
  insertQuestionNumericalOptionParams,
  updateQuestionNumericalOptionParams 
} from "@soco/question-db/schema/questionNumericalOptions";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionNumericalOptionParams.parse(await req.json());
    const { questionNumericalOption } = await createQuestionNumericalOption(validatedData);

    revalidatePath("/questionNumericalOptions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionNumericalOption, { status: 201 });
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

    const validatedData = updateQuestionNumericalOptionParams.parse(await req.json());
    const validatedParams = questionNumericalOptionIdSchema.parse({ id });

    const { questionNumericalOption } = await updateQuestionNumericalOption(validatedParams.id, validatedData);

    return NextResponse.json(questionNumericalOption, { status: 200 });
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

    const validatedParams = questionNumericalOptionIdSchema.parse({ id });
    const { questionNumericalOption } = await deleteQuestionNumericalOption(validatedParams.id);

    return NextResponse.json(questionNumericalOption, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
