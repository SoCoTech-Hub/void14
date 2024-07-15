import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createH5pContentsLibrary,
  deleteH5pContentsLibrary,
  updateH5pContentsLibrary,
} from "@soco/h5p-api/h5pContentsLibraries/mutations";
import { 
  h5pContentsLibraryIdSchema,
  insertH5pContentsLibraryParams,
  updateH5pContentsLibraryParams 
} from "@soco/h5p-db/schema/h5pContentsLibraries";

export async function POST(req: Request) {
  try {
    const validatedData = insertH5pContentsLibraryParams.parse(await req.json());
    const { h5pContentsLibrary } = await createH5pContentsLibrary(validatedData);

    revalidatePath("/h5pContentsLibraries"); // optional - assumes you will have named route same as entity

    return NextResponse.json(h5pContentsLibrary, { status: 201 });
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

    const validatedData = updateH5pContentsLibraryParams.parse(await req.json());
    const validatedParams = h5pContentsLibraryIdSchema.parse({ id });

    const { h5pContentsLibrary } = await updateH5pContentsLibrary(validatedParams.id, validatedData);

    return NextResponse.json(h5pContentsLibrary, { status: 200 });
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

    const validatedParams = h5pContentsLibraryIdSchema.parse({ id });
    const { h5pContentsLibrary } = await deleteH5pContentsLibrary(validatedParams.id);

    return NextResponse.json(h5pContentsLibrary, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
