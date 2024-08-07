import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createContextTemp,
  deleteContextTemp,
  updateContextTemp,
} from "@soco/context-api/contextTemp/mutations";
import { 
  contextTempIdSchema,
  insertContextTempParams,
  updateContextTempParams 
} from "@soco/context-db/schema/contextTemp";

export async function POST(req: Request) {
  try {
    const validatedData = insertContextTempParams.parse(await req.json());
    const { contextTemp } = await createContextTemp(validatedData);

    revalidatePath("/contextTemp"); // optional - assumes you will have named route same as entity

    return NextResponse.json(contextTemp, { status: 201 });
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

    const validatedData = updateContextTempParams.parse(await req.json());
    const validatedParams = contextTempIdSchema.parse({ id });

    const { contextTemp } = await updateContextTemp(validatedParams.id, validatedData);

    return NextResponse.json(contextTemp, { status: 200 });
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

    const validatedParams = contextTempIdSchema.parse({ id });
    const { contextTemp } = await deleteContextTemp(validatedParams.id);

    return NextResponse.json(contextTemp, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
