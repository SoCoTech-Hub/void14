import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createFile,
  deleteFile,
  updateFile,
} from "@/lib/api/files/mutations";
import { 
  fileIdSchema,
  insertFileParams,
  updateFileParams 
} from "@/lib/db/schema/files";

export async function POST(req: Request) {
  try {
    const validatedData = insertFileParams.parse(await req.json());
    const { file } = await createFile(validatedData);

    revalidatePath("/files"); // optional - assumes you will have named route same as entity

    return NextResponse.json(file, { status: 201 });
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

    const validatedData = updateFileParams.parse(await req.json());
    const validatedParams = fileIdSchema.parse({ id });

    const { file } = await updateFile(validatedParams.id, validatedData);

    return NextResponse.json(file, { status: 200 });
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

    const validatedParams = fileIdSchema.parse({ id });
    const { file } = await deleteFile(validatedParams.id);

    return NextResponse.json(file, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
