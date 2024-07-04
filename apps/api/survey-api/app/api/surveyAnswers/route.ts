import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createSurveyAnswer,
  deleteSurveyAnswer,
  updateSurveyAnswer,
} from "../../../lib/api/surveyAnswers/mutations";
import {
  insertSurveyAnswerParams,
  surveyAnswerIdSchema,
  updateSurveyAnswerParams,
} from "../../../lib/db/schema/surveyAnswers";

export async function POST(req: Request) {
  try {
    const validatedData = insertSurveyAnswerParams.parse(await req.json());
    const { surveyAnswer } = await createSurveyAnswer(validatedData);

    revalidatePath("/surveyAnswers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(surveyAnswer, { status: 201 });
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

    const validatedData = updateSurveyAnswerParams.parse(await req.json());
    const validatedParams = surveyAnswerIdSchema.parse({ id });

    const { surveyAnswer } = await updateSurveyAnswer(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(surveyAnswer, { status: 200 });
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

    const validatedParams = surveyAnswerIdSchema.parse({ id });
    const { surveyAnswer } = await deleteSurveyAnswer(validatedParams.id);

    return NextResponse.json(surveyAnswer, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
