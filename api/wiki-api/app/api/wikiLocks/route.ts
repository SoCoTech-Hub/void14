import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createWikiLock,
  deleteWikiLock,
  updateWikiLock,
} from "@/lib/api/wikiLocks/mutations";
import { 
  wikiLockIdSchema,
  insertWikiLockParams,
  updateWikiLockParams 
} from "@/lib/db/schema/wikiLocks";

export async function POST(req: Request) {
  try {
    const validatedData = insertWikiLockParams.parse(await req.json());
    const { wikiLock } = await createWikiLock(validatedData);

    revalidatePath("/wikiLocks"); // optional - assumes you will have named route same as entity

    return NextResponse.json(wikiLock, { status: 201 });
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

    const validatedData = updateWikiLockParams.parse(await req.json());
    const validatedParams = wikiLockIdSchema.parse({ id });

    const { wikiLock } = await updateWikiLock(validatedParams.id, validatedData);

    return NextResponse.json(wikiLock, { status: 200 });
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

    const validatedParams = wikiLockIdSchema.parse({ id });
    const { wikiLock } = await deleteWikiLock(validatedParams.id);

    return NextResponse.json(wikiLock, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
