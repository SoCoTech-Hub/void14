import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createLockDb,
  deleteLockDb,
  updateLockDb,
} from "../../../lib/api/lockDbs/mutations";
import {
  insertLockDbParams,
  lockDbIdSchema,
  updateLockDbParams,
} from "../../../lib/db/schema/lockDbs";

export async function POST(req: Request) {
  try {
    const validatedData = insertLockDbParams.parse(await req.json());
    const { lockDb } = await createLockDb(validatedData);

    revalidatePath("/lockDbs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(lockDb, { status: 201 });
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

    const validatedData = updateLockDbParams.parse(await req.json());
    const validatedParams = lockDbIdSchema.parse({ id });

    const { lockDb } = await updateLockDb(validatedParams.id, validatedData);

    return NextResponse.json(lockDb, { status: 200 });
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

    const validatedParams = lockDbIdSchema.parse({ id });
    const { lockDb } = await deleteLockDb(validatedParams.id);

    return NextResponse.json(lockDb, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
