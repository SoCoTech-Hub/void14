import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQtypeMatchOption,
  deleteQtypeMatchOption,
  updateQtypeMatchOption,
} from "@/lib/api/qtypeMatchOptions/mutations";
import { 
  qtypeMatchOptionIdSchema,
  insertQtypeMatchOptionParams,
  updateQtypeMatchOptionParams 
} from "@/lib/db/schema/qtypeMatchOptions";

export async function POST(req: Request) {
  try {
    const validatedData = insertQtypeMatchOptionParams.parse(await req.json());
    const { qtypeMatchOption } = await createQtypeMatchOption(validatedData);

    revalidatePath("/qtypeMatchOptions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(qtypeMatchOption, { status: 201 });
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

    const validatedData = updateQtypeMatchOptionParams.parse(await req.json());
    const validatedParams = qtypeMatchOptionIdSchema.parse({ id });

    const { qtypeMatchOption } = await updateQtypeMatchOption(validatedParams.id, validatedData);

    return NextResponse.json(qtypeMatchOption, { status: 200 });
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

    const validatedParams = qtypeMatchOptionIdSchema.parse({ id });
    const { qtypeMatchOption } = await deleteQtypeMatchOption(validatedParams.id);

    return NextResponse.json(qtypeMatchOption, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
