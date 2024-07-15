import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGlossary,
  deleteGlossary,
  updateGlossary,
} from "@soco/glossary-api/glossaries/mutations";
import { 
  glossaryIdSchema,
  insertGlossaryParams,
  updateGlossaryParams 
} from "@soco/glossary-db/schema/glossaries";

export async function POST(req: Request) {
  try {
    const validatedData = insertGlossaryParams.parse(await req.json());
    const { glossary } = await createGlossary(validatedData);

    revalidatePath("/glossaries"); // optional - assumes you will have named route same as entity

    return NextResponse.json(glossary, { status: 201 });
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

    const validatedData = updateGlossaryParams.parse(await req.json());
    const validatedParams = glossaryIdSchema.parse({ id });

    const { glossary } = await updateGlossary(validatedParams.id, validatedData);

    return NextResponse.json(glossary, { status: 200 });
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

    const validatedParams = glossaryIdSchema.parse({ id });
    const { glossary } = await deleteGlossary(validatedParams.id);

    return NextResponse.json(glossary, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
