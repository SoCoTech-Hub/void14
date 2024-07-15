import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createFileConversion,
  deleteFileConversion,
  updateFileConversion,
} from "@soco/file-api/fileConversions/mutations";
import { 
  fileConversionIdSchema,
  insertFileConversionParams,
  updateFileConversionParams 
} from "@soco/file-db/schema/fileConversions";

export async function POST(req: Request) {
  try {
    const validatedData = insertFileConversionParams.parse(await req.json());
    const { fileConversion } = await createFileConversion(validatedData);

    revalidatePath("/fileConversions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(fileConversion, { status: 201 });
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

    const validatedData = updateFileConversionParams.parse(await req.json());
    const validatedParams = fileConversionIdSchema.parse({ id });

    const { fileConversion } = await updateFileConversion(validatedParams.id, validatedData);

    return NextResponse.json(fileConversion, { status: 200 });
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

    const validatedParams = fileConversionIdSchema.parse({ id });
    const { fileConversion } = await deleteFileConversion(validatedParams.id);

    return NextResponse.json(fileConversion, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
