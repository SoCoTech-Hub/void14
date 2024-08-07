import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCustomFieldData,
  deleteCustomFieldData,
  updateCustomFieldData,
} from "@soco/custom-field-api/customFieldDatas/mutations";
import { 
  customFieldDataIdSchema,
  insertCustomFieldDataParams,
  updateCustomFieldDataParams 
} from "@soco/custom-field-db/schema/customFieldDatas";

export async function POST(req: Request) {
  try {
    const validatedData = insertCustomFieldDataParams.parse(await req.json());
    const { customFieldData } = await createCustomFieldData(validatedData);

    revalidatePath("/customFieldDatas"); // optional - assumes you will have named route same as entity

    return NextResponse.json(customFieldData, { status: 201 });
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

    const validatedData = updateCustomFieldDataParams.parse(await req.json());
    const validatedParams = customFieldDataIdSchema.parse({ id });

    const { customFieldData } = await updateCustomFieldData(validatedParams.id, validatedData);

    return NextResponse.json(customFieldData, { status: 200 });
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

    const validatedParams = customFieldDataIdSchema.parse({ id });
    const { customFieldData } = await deleteCustomFieldData(validatedParams.id);

    return NextResponse.json(customFieldData, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
