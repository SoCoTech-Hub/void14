import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createSearchSimpledbIndex,
  deleteSearchSimpledbIndex,
  updateSearchSimpledbIndex,
} from "@/lib/api/searchSimpledbIndexes/mutations";
import { 
  searchSimpledbIndexIdSchema,
  insertSearchSimpledbIndexParams,
  updateSearchSimpledbIndexParams 
} from "@/lib/db/schema/searchSimpledbIndexes";

export async function POST(req: Request) {
  try {
    const validatedData = insertSearchSimpledbIndexParams.parse(await req.json());
    const { searchSimpledbIndex } = await createSearchSimpledbIndex(validatedData);

    revalidatePath("/searchSimpledbIndexes"); // optional - assumes you will have named route same as entity

    return NextResponse.json(searchSimpledbIndex, { status: 201 });
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

    const validatedData = updateSearchSimpledbIndexParams.parse(await req.json());
    const validatedParams = searchSimpledbIndexIdSchema.parse({ id });

    const { searchSimpledbIndex } = await updateSearchSimpledbIndex(validatedParams.id, validatedData);

    return NextResponse.json(searchSimpledbIndex, { status: 200 });
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

    const validatedParams = searchSimpledbIndexIdSchema.parse({ id });
    const { searchSimpledbIndex } = await deleteSearchSimpledbIndex(validatedParams.id);

    return NextResponse.json(searchSimpledbIndex, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
