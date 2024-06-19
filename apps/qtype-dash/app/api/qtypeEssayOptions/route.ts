import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createQtypeEssayOption,
  deleteQtypeEssayOption,
  updateQtypeEssayOption,
} from "@/lib/api/qtypeEssayOptions/mutations";
import { 
  qtypeEssayOptionIdSchema,
  insertQtypeEssayOptionParams,
  updateQtypeEssayOptionParams 
} from "@/lib/db/schema/qtypeEssayOptions";

export async function POST(req: Request) {
  try {
    const validatedData = insertQtypeEssayOptionParams.parse(await req.json());
    const { qtypeEssayOption } = await createQtypeEssayOption(validatedData);

    revalidatePath("/qtypeEssayOptions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(qtypeEssayOption, { status: 201 });
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

    const validatedData = updateQtypeEssayOptionParams.parse(await req.json());
    const validatedParams = qtypeEssayOptionIdSchema.parse({ id });

    const { qtypeEssayOption } = await updateQtypeEssayOption(validatedParams.id, validatedData);

    return NextResponse.json(qtypeEssayOption, { status: 200 });
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

    const validatedParams = qtypeEssayOptionIdSchema.parse({ id });
    const { qtypeEssayOption } = await deleteQtypeEssayOption(validatedParams.id);

    return NextResponse.json(qtypeEssayOption, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
