import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createFilesReference,
  deleteFilesReference,
  updateFilesReference,
} from "../../../lib/api/filesReferences/mutations";
import {
  filesReferenceIdSchema,
  insertFilesReferenceParams,
  updateFilesReferenceParams,
} from "../../../lib/db/schema/filesReferences";

export async function POST(req: Request) {
  try {
    const validatedData = insertFilesReferenceParams.parse(await req.json());
    const { filesReference } = await createFilesReference(validatedData);

    revalidatePath("/filesReferences"); // optional - assumes you will have named route same as entity

    return NextResponse.json(filesReference, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateFilesReferenceParams.parse(await req.json());
    const validatedParams = filesReferenceIdSchema.parse({ id });

    const { filesReference } = await updateFilesReference(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(filesReference, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = filesReferenceIdSchema.parse({ id });
    const { filesReference } = await deleteFilesReference(validatedParams.id);

    return NextResponse.json(filesReference, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
