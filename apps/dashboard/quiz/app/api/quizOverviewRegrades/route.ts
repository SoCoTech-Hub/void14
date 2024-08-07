import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuizOverviewRegrade,
  deleteQuizOverviewRegrade,
  updateQuizOverviewRegrade,
} from "@soco/quiz-api/quizOverviewRegrades/mutations";
import { 
  quizOverviewRegradeIdSchema,
  insertQuizOverviewRegradeParams,
  updateQuizOverviewRegradeParams 
} from "@soco/quiz-db/schema/quizOverviewRegrades";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuizOverviewRegradeParams.parse(await req.json());
    const { quizOverviewRegrade } = await createQuizOverviewRegrade(validatedData);

    revalidatePath("/quizOverviewRegrades"); // optional - assumes you will have named route same as entity

    return NextResponse.json(quizOverviewRegrade, { status: 201 });
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

    const validatedData = updateQuizOverviewRegradeParams.parse(await req.json());
    const validatedParams = quizOverviewRegradeIdSchema.parse({ id });

    const { quizOverviewRegrade } = await updateQuizOverviewRegrade(validatedParams.id, validatedData);

    return NextResponse.json(quizOverviewRegrade, { status: 200 });
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

    const validatedParams = quizOverviewRegradeIdSchema.parse({ id });
    const { quizOverviewRegrade } = await deleteQuizOverviewRegrade(validatedParams.id);

    return NextResponse.json(quizOverviewRegrade, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
