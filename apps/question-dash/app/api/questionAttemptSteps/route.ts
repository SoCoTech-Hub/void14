import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuestionAttemptStep,
  deleteQuestionAttemptStep,
  updateQuestionAttemptStep,
} from "@/lib/api/questionAttemptSteps/mutations";
import { 
  questionAttemptStepIdSchema,
  insertQuestionAttemptStepParams,
  updateQuestionAttemptStepParams 
} from "@/lib/db/schema/questionAttemptSteps";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionAttemptStepParams.parse(await req.json());
    const { questionAttemptStep } = await createQuestionAttemptStep(validatedData);

    revalidatePath("/questionAttemptSteps"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionAttemptStep, { status: 201 });
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

    const validatedData = updateQuestionAttemptStepParams.parse(await req.json());
    const validatedParams = questionAttemptStepIdSchema.parse({ id });

    const { questionAttemptStep } = await updateQuestionAttemptStep(validatedParams.id, validatedData);

    return NextResponse.json(questionAttemptStep, { status: 200 });
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

    const validatedParams = questionAttemptStepIdSchema.parse({ id });
    const { questionAttemptStep } = await deleteQuestionAttemptStep(validatedParams.id);

    return NextResponse.json(questionAttemptStep, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
