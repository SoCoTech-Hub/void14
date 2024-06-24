import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createFilterActive,
  deleteFilterActive,
  updateFilterActive,
} from "@/lib/api/filterActives/mutations";
import { 
  filterActiveIdSchema,
  insertFilterActiveParams,
  updateFilterActiveParams 
} from "@/lib/db/schema/filterActives";

export async function POST(req: Request) {
  try {
    const validatedData = insertFilterActiveParams.parse(await req.json());
    const { filterActive } = await createFilterActive(validatedData);

    revalidatePath("/filterActives"); // optional - assumes you will have named route same as entity

    return NextResponse.json(filterActive, { status: 201 });
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

    const validatedData = updateFilterActiveParams.parse(await req.json());
    const validatedParams = filterActiveIdSchema.parse({ id });

    const { filterActive } = await updateFilterActive(validatedParams.id, validatedData);

    return NextResponse.json(filterActive, { status: 200 });
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

    const validatedParams = filterActiveIdSchema.parse({ id });
    const { filterActive } = await deleteFilterActive(validatedParams.id);

    return NextResponse.json(filterActive, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
