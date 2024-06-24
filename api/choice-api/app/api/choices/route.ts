import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createChoice,
  deleteChoice,
  updateChoice,
} from "@/lib/api/choices/mutations";
import { 
  choiceIdSchema,
  insertChoiceParams,
  updateChoiceParams 
} from "@/lib/db/schema/choices";

export async function POST(req: Request) {
  try {
    const validatedData = insertChoiceParams.parse(await req.json());
    const { choice } = await createChoice(validatedData);

    revalidatePath("/choices"); // optional - assumes you will have named route same as entity

    return NextResponse.json(choice, { status: 201 });
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

    const validatedData = updateChoiceParams.parse(await req.json());
    const validatedParams = choiceIdSchema.parse({ id });

    const { choice } = await updateChoice(validatedParams.id, validatedData);

    return NextResponse.json(choice, { status: 200 });
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

    const validatedParams = choiceIdSchema.parse({ id });
    const { choice } = await deleteChoice(validatedParams.id);

    return NextResponse.json(choice, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
