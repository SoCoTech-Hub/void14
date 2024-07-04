import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createModule,
  deleteModule,
  updateModule,
} from "../../../lib/api/modules/mutations";
import {
  insertModuleParams,
  moduleIdSchema,
  updateModuleParams,
} from "../../../lib/db/schema/modules";

export async function POST(req: Request) {
  try {
    const validatedData = insertModuleParams.parse(await req.json());
    const { module } = await createModule(validatedData);

    revalidatePath("/modules"); // optional - assumes you will have named route same as entity

    return NextResponse.json(module, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateModuleParams.parse(await req.json());
    const validatedParams = moduleIdSchema.parse({ id });

    const { module } = await updateModule(validatedParams.id, validatedData);

    return NextResponse.json(module, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = moduleIdSchema.parse({ id });
    const { module } = await deleteModule(validatedParams.id);

    return NextResponse.json(module, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
