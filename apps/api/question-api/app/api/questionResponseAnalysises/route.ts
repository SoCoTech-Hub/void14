import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createQuestionResponseAnalysise,
  deleteQuestionResponseAnalysise,
  updateQuestionResponseAnalysise,
} from "../../../lib/api/questionResponseAnalysises/mutations";
import {
  insertQuestionResponseAnalysiseParams,
  questionResponseAnalysiseIdSchema,
  updateQuestionResponseAnalysiseParams,
} from "../../../lib/db/schema/questionResponseAnalysises";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionResponseAnalysiseParams.parse(
      await req.json(),
    );
    const { questionResponseAnalysise } =
      await createQuestionResponseAnalysise(validatedData);

    revalidatePath("/questionResponseAnalysises"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionResponseAnalysise, { status: 201 });
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

    const validatedData = updateQuestionResponseAnalysiseParams.parse(
      await req.json(),
    );
    const validatedParams = questionResponseAnalysiseIdSchema.parse({ id });

    const { questionResponseAnalysise } = await updateQuestionResponseAnalysise(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(questionResponseAnalysise, { status: 200 });
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

    const validatedParams = questionResponseAnalysiseIdSchema.parse({ id });
    const { questionResponseAnalysise } = await deleteQuestionResponseAnalysise(
      validatedParams.id,
    );

    return NextResponse.json(questionResponseAnalysise, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
