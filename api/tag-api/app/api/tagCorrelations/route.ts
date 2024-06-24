import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createTagCorrelation,
  deleteTagCorrelation,
  updateTagCorrelation,
} from "@/lib/api/tagCorrelations/mutations";
import { 
  tagCorrelationIdSchema,
  insertTagCorrelationParams,
  updateTagCorrelationParams 
} from "@/lib/db/schema/tagCorrelations";

export async function POST(req: Request) {
  try {
    const validatedData = insertTagCorrelationParams.parse(await req.json());
    const { tagCorrelation } = await createTagCorrelation(validatedData);

    revalidatePath("/tagCorrelations"); // optional - assumes you will have named route same as entity

    return NextResponse.json(tagCorrelation, { status: 201 });
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

    const validatedData = updateTagCorrelationParams.parse(await req.json());
    const validatedParams = tagCorrelationIdSchema.parse({ id });

    const { tagCorrelation } = await updateTagCorrelation(validatedParams.id, validatedData);

    return NextResponse.json(tagCorrelation, { status: 200 });
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

    const validatedParams = tagCorrelationIdSchema.parse({ id });
    const { tagCorrelation } = await deleteTagCorrelation(validatedParams.id);

    return NextResponse.json(tagCorrelation, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
