import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGlossaryEntry,
  deleteGlossaryEntry,
  updateGlossaryEntry,
} from "@/lib/api/glossaryEntries/mutations";
import { 
  glossaryEntryIdSchema,
  insertGlossaryEntryParams,
  updateGlossaryEntryParams 
} from "@/lib/db/schema/glossaryEntries";

export async function POST(req: Request) {
  try {
    const validatedData = insertGlossaryEntryParams.parse(await req.json());
    const { glossaryEntry } = await createGlossaryEntry(validatedData);

    revalidatePath("/glossaryEntries"); // optional - assumes you will have named route same as entity

    return NextResponse.json(glossaryEntry, { status: 201 });
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

    const validatedData = updateGlossaryEntryParams.parse(await req.json());
    const validatedParams = glossaryEntryIdSchema.parse({ id });

    const { glossaryEntry } = await updateGlossaryEntry(validatedParams.id, validatedData);

    return NextResponse.json(glossaryEntry, { status: 200 });
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

    const validatedParams = glossaryEntryIdSchema.parse({ id });
    const { glossaryEntry } = await deleteGlossaryEntry(validatedParams.id);

    return NextResponse.json(glossaryEntry, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
