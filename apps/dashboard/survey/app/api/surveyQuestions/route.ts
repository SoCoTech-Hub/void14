import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createSurveyQuestion,
  deleteSurveyQuestion,
  updateSurveyQuestion,
} from "@soco/survey-api/surveyQuestions/mutations";
import { 
  surveyQuestionIdSchema,
  insertSurveyQuestionParams,
  updateSurveyQuestionParams 
} from "@soco/survey-db/schema/surveyQuestions";

export async function POST(req: Request) {
  try {
    const validatedData = insertSurveyQuestionParams.parse(await req.json());
    const { surveyQuestion } = await createSurveyQuestion(validatedData);

    revalidatePath("/surveyQuestions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(surveyQuestion, { status: 201 });
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

    const validatedData = updateSurveyQuestionParams.parse(await req.json());
    const validatedParams = surveyQuestionIdSchema.parse({ id });

    const { surveyQuestion } = await updateSurveyQuestion(validatedParams.id, validatedData);

    return NextResponse.json(surveyQuestion, { status: 200 });
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

    const validatedParams = surveyQuestionIdSchema.parse({ id });
    const { surveyQuestion } = await deleteSurveyQuestion(validatedParams.id);

    return NextResponse.json(surveyQuestion, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
