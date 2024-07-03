import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQtypeShortanswerOption,
  deleteQtypeShortanswerOption,
  updateQtypeShortanswerOption,
} from "@/lib/api/qtypeShortanswerOptions/mutations";
import { 
  qtypeShortanswerOptionIdSchema,
  insertQtypeShortanswerOptionParams,
  updateQtypeShortanswerOptionParams 
} from "@/lib/db/schema/qtypeShortanswerOptions";

export async function POST(req: Request) {
  try {
    const validatedData = insertQtypeShortanswerOptionParams.parse(await req.json());
    const { qtypeShortanswerOption } = await createQtypeShortanswerOption(validatedData);

    revalidatePath("/qtypeShortanswerOptions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(qtypeShortanswerOption, { status: 201 });
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

    const validatedData = updateQtypeShortanswerOptionParams.parse(await req.json());
    const validatedParams = qtypeShortanswerOptionIdSchema.parse({ id });

    const { qtypeShortanswerOption } = await updateQtypeShortanswerOption(validatedParams.id, validatedData);

    return NextResponse.json(qtypeShortanswerOption, { status: 200 });
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

    const validatedParams = qtypeShortanswerOptionIdSchema.parse({ id });
    const { qtypeShortanswerOption } = await deleteQtypeShortanswerOption(validatedParams.id);

    return NextResponse.json(qtypeShortanswerOption, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
