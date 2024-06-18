import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createH5p,
  deleteH5p,
  updateH5p,
} from "@/lib/api/h5ps/mutations";
import { 
  h5pIdSchema,
  insertH5pParams,
  updateH5pParams 
} from "@/lib/db/schema/h5ps";

export async function POST(req: Request) {
  try {
    const validatedData = insertH5pParams.parse(await req.json());
    const { h5p } = await createH5p(validatedData);

    revalidatePath("/h5ps"); // optional - assumes you will have named route same as entity

    return NextResponse.json(h5p, { status: 201 });
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

    const validatedData = updateH5pParams.parse(await req.json());
    const validatedParams = h5pIdSchema.parse({ id });

    const { h5p } = await updateH5p(validatedParams.id, validatedData);

    return NextResponse.json(h5p, { status: 200 });
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

    const validatedParams = h5pIdSchema.parse({ id });
    const { h5p } = await deleteH5p(validatedParams.id);

    return NextResponse.json(h5p, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
