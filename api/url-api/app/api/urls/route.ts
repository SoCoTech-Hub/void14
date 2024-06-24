import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createUrl,
  deleteUrl,
  updateUrl,
} from "@/lib/api/urls/mutations";
import { 
  urlIdSchema,
  insertUrlParams,
  updateUrlParams 
} from "@/lib/db/schema/urls";

export async function POST(req: Request) {
  try {
    const validatedData = insertUrlParams.parse(await req.json());
    const { url } = await createUrl(validatedData);

    revalidatePath("/urls"); // optional - assumes you will have named route same as entity

    return NextResponse.json(url, { status: 201 });
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

    const validatedData = updateUrlParams.parse(await req.json());
    const validatedParams = urlIdSchema.parse({ id });

    const { url } = await updateUrl(validatedParams.id, validatedData);

    return NextResponse.json(url, { status: 200 });
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

    const validatedParams = urlIdSchema.parse({ id });
    const { url } = await deleteUrl(validatedParams.id);

    return NextResponse.json(url, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
