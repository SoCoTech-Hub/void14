import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGlossaryFormat,
  deleteGlossaryFormat,
  updateGlossaryFormat,
} from "@/lib/api/glossaryFormats/mutations";
import { 
  glossaryFormatIdSchema,
  insertGlossaryFormatParams,
  updateGlossaryFormatParams 
} from "@/lib/db/schema/glossaryFormats";

export async function POST(req: Request) {
  try {
    const validatedData = insertGlossaryFormatParams.parse(await req.json());
    const { glossaryFormat } = await createGlossaryFormat(validatedData);

    revalidatePath("/glossaryFormats"); // optional - assumes you will have named route same as entity

    return NextResponse.json(glossaryFormat, { status: 201 });
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

    const validatedData = updateGlossaryFormatParams.parse(await req.json());
    const validatedParams = glossaryFormatIdSchema.parse({ id });

    const { glossaryFormat } = await updateGlossaryFormat(validatedParams.id, validatedData);

    return NextResponse.json(glossaryFormat, { status: 200 });
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

    const validatedParams = glossaryFormatIdSchema.parse({ id });
    const { glossaryFormat } = await deleteGlossaryFormat(validatedParams.id);

    return NextResponse.json(glossaryFormat, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
