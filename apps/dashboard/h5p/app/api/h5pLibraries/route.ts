import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createH5pLibrary,
  deleteH5pLibrary,
  updateH5pLibrary,
} from "@soco/h5p-api/h5pLibraries/mutations";
import { 
  h5pLibraryIdSchema,
  insertH5pLibraryParams,
  updateH5pLibraryParams 
} from "@soco/h5p-db/schema/h5pLibraries";

export async function POST(req: Request) {
  try {
    const validatedData = insertH5pLibraryParams.parse(await req.json());
    const { h5pLibrary } = await createH5pLibrary(validatedData);

    revalidatePath("/h5pLibraries"); // optional - assumes you will have named route same as entity

    return NextResponse.json(h5pLibrary, { status: 201 });
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

    const validatedData = updateH5pLibraryParams.parse(await req.json());
    const validatedParams = h5pLibraryIdSchema.parse({ id });

    const { h5pLibrary } = await updateH5pLibrary(validatedParams.id, validatedData);

    return NextResponse.json(h5pLibrary, { status: 200 });
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

    const validatedParams = h5pLibraryIdSchema.parse({ id });
    const { h5pLibrary } = await deleteH5pLibrary(validatedParams.id);

    return NextResponse.json(h5pLibrary, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
