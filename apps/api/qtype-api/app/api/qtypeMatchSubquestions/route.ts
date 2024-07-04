import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createQtypeMatchSubquestion,
  deleteQtypeMatchSubquestion,
  updateQtypeMatchSubquestion,
} from "../../../lib/api/qtypeMatchSubquestions/mutations";
import {
  insertQtypeMatchSubquestionParams,
  qtypeMatchSubquestionIdSchema,
  updateQtypeMatchSubquestionParams,
} from "../../../lib/db/schema/qtypeMatchSubquestions";

export async function POST(req: Request) {
  try {
    const validatedData = insertQtypeMatchSubquestionParams.parse(
      await req.json(),
    );
    const { qtypeMatchSubquestion } =
      await createQtypeMatchSubquestion(validatedData);

    revalidatePath("/qtypeMatchSubquestions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(qtypeMatchSubquestion, { status: 201 });
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

    const validatedData = updateQtypeMatchSubquestionParams.parse(
      await req.json(),
    );
    const validatedParams = qtypeMatchSubquestionIdSchema.parse({ id });

    const { qtypeMatchSubquestion } = await updateQtypeMatchSubquestion(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(qtypeMatchSubquestion, { status: 200 });
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

    const validatedParams = qtypeMatchSubquestionIdSchema.parse({ id });
    const { qtypeMatchSubquestion } = await deleteQtypeMatchSubquestion(
      validatedParams.id,
    );

    return NextResponse.json(qtypeMatchSubquestion, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
