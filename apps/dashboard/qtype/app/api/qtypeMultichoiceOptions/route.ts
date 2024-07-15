import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQtypeMultichoiceOption,
  deleteQtypeMultichoiceOption,
  updateQtypeMultichoiceOption,
} from "@soco/qtype-api/qtypeMultichoiceOptions/mutations";
import { 
  qtypeMultichoiceOptionIdSchema,
  insertQtypeMultichoiceOptionParams,
  updateQtypeMultichoiceOptionParams 
} from "@soco/qtype-db/schema/qtypeMultichoiceOptions";

export async function POST(req: Request) {
  try {
    const validatedData = insertQtypeMultichoiceOptionParams.parse(await req.json());
    const { qtypeMultichoiceOption } = await createQtypeMultichoiceOption(validatedData);

    revalidatePath("/qtypeMultichoiceOptions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(qtypeMultichoiceOption, { status: 201 });
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

    const validatedData = updateQtypeMultichoiceOptionParams.parse(await req.json());
    const validatedParams = qtypeMultichoiceOptionIdSchema.parse({ id });

    const { qtypeMultichoiceOption } = await updateQtypeMultichoiceOption(validatedParams.id, validatedData);

    return NextResponse.json(qtypeMultichoiceOption, { status: 200 });
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

    const validatedParams = qtypeMultichoiceOptionIdSchema.parse({ id });
    const { qtypeMultichoiceOption } = await deleteQtypeMultichoiceOption(validatedParams.id);

    return NextResponse.json(qtypeMultichoiceOption, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
