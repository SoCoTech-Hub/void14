import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createExternalFunction,
  deleteExternalFunction,
  updateExternalFunction,
} from "@/lib/api/externalFunctions/mutations";
import { 
  externalFunctionIdSchema,
  insertExternalFunctionParams,
  updateExternalFunctionParams 
} from "@/lib/db/schema/externalFunctions";

export async function POST(req: Request) {
  try {
    const validatedData = insertExternalFunctionParams.parse(await req.json());
    const { externalFunction } = await createExternalFunction(validatedData);

    revalidatePath("/externalFunctions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(externalFunction, { status: 201 });
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

    const validatedData = updateExternalFunctionParams.parse(await req.json());
    const validatedParams = externalFunctionIdSchema.parse({ id });

    const { externalFunction } = await updateExternalFunction(validatedParams.id, validatedData);

    return NextResponse.json(externalFunction, { status: 200 });
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

    const validatedParams = externalFunctionIdSchema.parse({ id });
    const { externalFunction } = await deleteExternalFunction(validatedParams.id);

    return NextResponse.json(externalFunction, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
