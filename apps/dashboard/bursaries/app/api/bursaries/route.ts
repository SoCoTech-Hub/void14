import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBursary,
  deleteBursary,
  updateBursary,
} from "@/lib/api/bursaries/mutations";
import { 
  bursaryIdSchema,
  insertBursaryParams,
  updateBursaryParams 
} from "@/lib/db/schema/bursaries";

export async function POST(req: Request) {
  try {
    const validatedData = insertBursaryParams.parse(await req.json());
    const { bursary } = await createBursary(validatedData);

    revalidatePath("/bursaries"); // optional - assumes you will have named route same as entity

    return NextResponse.json(bursary, { status: 201 });
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

    const validatedData = updateBursaryParams.parse(await req.json());
    const validatedParams = bursaryIdSchema.parse({ id });

    const { bursary } = await updateBursary(validatedParams.id, validatedData);

    return NextResponse.json(bursary, { status: 200 });
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

    const validatedParams = bursaryIdSchema.parse({ id });
    const { bursary } = await deleteBursary(validatedParams.id);

    return NextResponse.json(bursary, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
