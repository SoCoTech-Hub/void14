import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createField,
  deleteField,
  updateField,
} from "@/lib/api/fields/mutations";
import { 
  fieldIdSchema,
  insertFieldParams,
  updateFieldParams 
} from "@/lib/db/schema/fields";

export async function POST(req: Request) {
  try {
    const validatedData = insertFieldParams.parse(await req.json());
    const { field } = await createField(validatedData);

    revalidatePath("/fields"); // optional - assumes you will have named route same as entity

    return NextResponse.json(field, { status: 201 });
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

    const validatedData = updateFieldParams.parse(await req.json());
    const validatedParams = fieldIdSchema.parse({ id });

    const { field } = await updateField(validatedParams.id, validatedData);

    return NextResponse.json(field, { status: 200 });
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

    const validatedParams = fieldIdSchema.parse({ id });
    const { field } = await deleteField(validatedParams.id);

    return NextResponse.json(field, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
