import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuestionCategory,
  deleteQuestionCategory,
  updateQuestionCategory,
} from "@soco/question-api/questionCategories/mutations";
import { 
  questionCategoryIdSchema,
  insertQuestionCategoryParams,
  updateQuestionCategoryParams 
} from "@soco/question-db/schema/questionCategories";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuestionCategoryParams.parse(await req.json());
    const { questionCategory } = await createQuestionCategory(validatedData);

    revalidatePath("/questionCategories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(questionCategory, { status: 201 });
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

    const validatedData = updateQuestionCategoryParams.parse(await req.json());
    const validatedParams = questionCategoryIdSchema.parse({ id });

    const { questionCategory } = await updateQuestionCategory(validatedParams.id, validatedData);

    return NextResponse.json(questionCategory, { status: 200 });
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

    const validatedParams = questionCategoryIdSchema.parse({ id });
    const { questionCategory } = await deleteQuestionCategory(validatedParams.id);

    return NextResponse.json(questionCategory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
