import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createSurvey,
  deleteSurvey,
  updateSurvey,
} from "@/lib/api/surveys/mutations";
import { 
  surveyIdSchema,
  insertSurveyParams,
  updateSurveyParams 
} from "@/lib/db/schema/surveys";

export async function POST(req: Request) {
  try {
    const validatedData = insertSurveyParams.parse(await req.json());
    const { survey } = await createSurvey(validatedData);

    revalidatePath("/surveys"); // optional - assumes you will have named route same as entity

    return NextResponse.json(survey, { status: 201 });
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

    const validatedData = updateSurveyParams.parse(await req.json());
    const validatedParams = surveyIdSchema.parse({ id });

    const { survey } = await updateSurvey(validatedParams.id, validatedData);

    return NextResponse.json(survey, { status: 200 });
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

    const validatedParams = surveyIdSchema.parse({ id });
    const { survey } = await deleteSurvey(validatedParams.id);

    return NextResponse.json(survey, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
