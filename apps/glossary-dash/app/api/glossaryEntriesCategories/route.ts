import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGlossaryEntriesCategory,
  deleteGlossaryEntriesCategory,
  updateGlossaryEntriesCategory,
} from "@/lib/api/glossaryEntriesCategories/mutations";
import { 
  glossaryEntriesCategoryIdSchema,
  insertGlossaryEntriesCategoryParams,
  updateGlossaryEntriesCategoryParams 
} from "@/lib/db/schema/glossaryEntriesCategories";

export async function POST(req: Request) {
  try {
    const validatedData = insertGlossaryEntriesCategoryParams.parse(await req.json());
    const { glossaryEntriesCategory } = await createGlossaryEntriesCategory(validatedData);

    revalidatePath("/glossaryEntriesCategories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(glossaryEntriesCategory, { status: 201 });
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

    const validatedData = updateGlossaryEntriesCategoryParams.parse(await req.json());
    const validatedParams = glossaryEntriesCategoryIdSchema.parse({ id });

    const { glossaryEntriesCategory } = await updateGlossaryEntriesCategory(validatedParams.id, validatedData);

    return NextResponse.json(glossaryEntriesCategory, { status: 200 });
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

    const validatedParams = glossaryEntriesCategoryIdSchema.parse({ id });
    const { glossaryEntriesCategory } = await deleteGlossaryEntriesCategory(validatedParams.id);

    return NextResponse.json(glossaryEntriesCategory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
