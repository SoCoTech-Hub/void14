import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQuizReport,
  deleteQuizReport,
  updateQuizReport,
} from "@soco/quiz-api/quizReports/mutations";
import { 
  quizReportIdSchema,
  insertQuizReportParams,
  updateQuizReportParams 
} from "@soco/quiz-db/schema/quizReports";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuizReportParams.parse(await req.json());
    const { quizReport } = await createQuizReport(validatedData);

    revalidatePath("/quizReports"); // optional - assumes you will have named route same as entity

    return NextResponse.json(quizReport, { status: 201 });
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

    const validatedData = updateQuizReportParams.parse(await req.json());
    const validatedParams = quizReportIdSchema.parse({ id });

    const { quizReport } = await updateQuizReport(validatedParams.id, validatedData);

    return NextResponse.json(quizReport, { status: 200 });
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

    const validatedParams = quizReportIdSchema.parse({ id });
    const { quizReport } = await deleteQuizReport(validatedParams.id);

    return NextResponse.json(quizReport, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
