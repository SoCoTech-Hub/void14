import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createScale,
  deleteScale,
  updateScale,
} from "@/lib/api/scales/mutations";
import { 
  scaleIdSchema,
  insertScaleParams,
  updateScaleParams 
} from "@/lib/db/schema/scales";

export async function POST(req: Request) {
  try {
    const validatedData = insertScaleParams.parse(await req.json());
    const { scale } = await createScale(validatedData);

    revalidatePath("/scales"); // optional - assumes you will have named route same as entity

    return NextResponse.json(scale, { status: 201 });
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

    const validatedData = updateScaleParams.parse(await req.json());
    const validatedParams = scaleIdSchema.parse({ id });

    const { scale } = await updateScale(validatedParams.id, validatedData);

    return NextResponse.json(scale, { status: 200 });
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

    const validatedParams = scaleIdSchema.parse({ id });
    const { scale } = await deleteScale(validatedParams.id);

    return NextResponse.json(scale, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
