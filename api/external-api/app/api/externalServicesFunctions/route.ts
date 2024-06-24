import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createExternalServicesFunction,
  deleteExternalServicesFunction,
  updateExternalServicesFunction,
} from "@/lib/api/externalServicesFunctions/mutations";
import { 
  externalServicesFunctionIdSchema,
  insertExternalServicesFunctionParams,
  updateExternalServicesFunctionParams 
} from "@/lib/db/schema/externalServicesFunctions";

export async function POST(req: Request) {
  try {
    const validatedData = insertExternalServicesFunctionParams.parse(await req.json());
    const { externalServicesFunction } = await createExternalServicesFunction(validatedData);

    revalidatePath("/externalServicesFunctions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(externalServicesFunction, { status: 201 });
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

    const validatedData = updateExternalServicesFunctionParams.parse(await req.json());
    const validatedParams = externalServicesFunctionIdSchema.parse({ id });

    const { externalServicesFunction } = await updateExternalServicesFunction(validatedParams.id, validatedData);

    return NextResponse.json(externalServicesFunction, { status: 200 });
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

    const validatedParams = externalServicesFunctionIdSchema.parse({ id });
    const { externalServicesFunction } = await deleteExternalServicesFunction(validatedParams.id);

    return NextResponse.json(externalServicesFunction, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
