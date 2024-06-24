import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createChoiceOption,
  deleteChoiceOption,
  updateChoiceOption,
} from "@/lib/api/choiceOptions/mutations";
import { 
  choiceOptionIdSchema,
  insertChoiceOptionParams,
  updateChoiceOptionParams 
} from "@/lib/db/schema/choiceOptions";

export async function POST(req: Request) {
  try {
    const validatedData = insertChoiceOptionParams.parse(await req.json());
    const { choiceOption } = await createChoiceOption(validatedData);

    revalidatePath("/choiceOptions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(choiceOption, { status: 201 });
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

    const validatedData = updateChoiceOptionParams.parse(await req.json());
    const validatedParams = choiceOptionIdSchema.parse({ id });

    const { choiceOption } = await updateChoiceOption(validatedParams.id, validatedData);

    return NextResponse.json(choiceOption, { status: 200 });
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

    const validatedParams = choiceOptionIdSchema.parse({ id });
    const { choiceOption } = await deleteChoiceOption(validatedParams.id);

    return NextResponse.json(choiceOption, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
