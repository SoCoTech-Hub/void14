import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createH5pLibraryDependency,
  deleteH5pLibraryDependency,
  updateH5pLibraryDependency,
} from "@/lib/api/h5pLibraryDependencies/mutations";
import { 
  h5pLibraryDependencyIdSchema,
  insertH5pLibraryDependencyParams,
  updateH5pLibraryDependencyParams 
} from "@/lib/db/schema/h5pLibraryDependencies";

export async function POST(req: Request) {
  try {
    const validatedData = insertH5pLibraryDependencyParams.parse(await req.json());
    const { h5pLibraryDependency } = await createH5pLibraryDependency(validatedData);

    revalidatePath("/h5pLibraryDependencies"); // optional - assumes you will have named route same as entity

    return NextResponse.json(h5pLibraryDependency, { status: 201 });
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

    const validatedData = updateH5pLibraryDependencyParams.parse(await req.json());
    const validatedParams = h5pLibraryDependencyIdSchema.parse({ id });

    const { h5pLibraryDependency } = await updateH5pLibraryDependency(validatedParams.id, validatedData);

    return NextResponse.json(h5pLibraryDependency, { status: 200 });
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

    const validatedParams = h5pLibraryDependencyIdSchema.parse({ id });
    const { h5pLibraryDependency } = await deleteH5pLibraryDependency(validatedParams.id);

    return NextResponse.json(h5pLibraryDependency, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
