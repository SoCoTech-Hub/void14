import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createQuizSlot,
  deleteQuizSlot,
  updateQuizSlot,
} from "../../../lib/api/quizSlots/mutations";
import {
  insertQuizSlotParams,
  quizSlotIdSchema,
  updateQuizSlotParams,
} from "../../../lib/db/schema/quizSlots";

export async function POST(req: Request) {
  try {
    const validatedData = insertQuizSlotParams.parse(await req.json());
    const { quizSlot } = await createQuizSlot(validatedData);

    revalidatePath("/quizSlots"); // optional - assumes you will have named route same as entity

    return NextResponse.json(quizSlot, { status: 201 });
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

    const validatedData = updateQuizSlotParams.parse(await req.json());
    const validatedParams = quizSlotIdSchema.parse({ id });

    const { quizSlot } = await updateQuizSlot(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(quizSlot, { status: 200 });
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

    const validatedParams = quizSlotIdSchema.parse({ id });
    const { quizSlot } = await deleteQuizSlot(validatedParams.id);

    return NextResponse.json(quizSlot, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
