import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCustomFieldField,
  deleteCustomFieldField,
  updateCustomFieldField,
} from "@soco/custom-field-api/customFieldFields/mutations";
import { 
  customFieldFieldIdSchema,
  insertCustomFieldFieldParams,
  updateCustomFieldFieldParams 
} from "@soco/custom-field-db/schema/customFieldFields";

export async function POST(req: Request) {
  try {
    const validatedData = insertCustomFieldFieldParams.parse(await req.json());
    const { customFieldField } = await createCustomFieldField(validatedData);

    revalidatePath("/customFieldFields"); // optional - assumes you will have named route same as entity

    return NextResponse.json(customFieldField, { status: 201 });
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

    const validatedData = updateCustomFieldFieldParams.parse(await req.json());
    const validatedParams = customFieldFieldIdSchema.parse({ id });

    const { customFieldField } = await updateCustomFieldField(validatedParams.id, validatedData);

    return NextResponse.json(customFieldField, { status: 200 });
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

    const validatedParams = customFieldFieldIdSchema.parse({ id });
    const { customFieldField } = await deleteCustomFieldField(validatedParams.id);

    return NextResponse.json(customFieldField, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
