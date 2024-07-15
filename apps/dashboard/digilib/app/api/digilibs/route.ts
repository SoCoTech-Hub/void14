import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createDigilib,
  deleteDigilib,
  updateDigilib,
} from "@soco/digilib-api/digilibs/mutations";
import { 
  digilibIdSchema,
  insertDigilibParams,
  updateDigilibParams 
} from "@soco/digilib-db/schema/digilibs";

export async function POST(req: Request) {
  try {
    const validatedData = insertDigilibParams.parse(await req.json());
    const { digilib } = await createDigilib(validatedData);

    revalidatePath("/digilibs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(digilib, { status: 201 });
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

    const validatedData = updateDigilibParams.parse(await req.json());
    const validatedParams = digilibIdSchema.parse({ id });

    const { digilib } = await updateDigilib(validatedParams.id, validatedData);

    return NextResponse.json(digilib, { status: 200 });
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

    const validatedParams = digilibIdSchema.parse({ id });
    const { digilib } = await deleteDigilib(validatedParams.id);

    return NextResponse.json(digilib, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
