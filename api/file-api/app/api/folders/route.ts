import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createFolder,
  deleteFolder,
  updateFolder,
} from "@/lib/api/folders/mutations";
import { 
  folderIdSchema,
  insertFolderParams,
  updateFolderParams 
} from "@/lib/db/schema/folders";

export async function POST(req: Request) {
  try {
    const validatedData = insertFolderParams.parse(await req.json());
    const { folder } = await createFolder(validatedData);

    revalidatePath("/folders"); // optional - assumes you will have named route same as entity

    return NextResponse.json(folder, { status: 201 });
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

    const validatedData = updateFolderParams.parse(await req.json());
    const validatedParams = folderIdSchema.parse({ id });

    const { folder } = await updateFolder(validatedParams.id, validatedData);

    return NextResponse.json(folder, { status: 200 });
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

    const validatedParams = folderIdSchema.parse({ id });
    const { folder } = await deleteFolder(validatedParams.id);

    return NextResponse.json(folder, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
