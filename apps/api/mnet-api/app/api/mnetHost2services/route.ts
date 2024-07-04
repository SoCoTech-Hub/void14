import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createMnetHost2service,
  deleteMnetHost2service,
  updateMnetHost2service,
} from "../../../lib/api/mnetHost2services/mutations";
import {
  insertMnetHost2serviceParams,
  mnetHost2serviceIdSchema,
  updateMnetHost2serviceParams,
} from "../../../lib/db/schema/mnetHost2services";

export async function POST(req: Request) {
  try {
    const validatedData = insertMnetHost2serviceParams.parse(await req.json());
    const { mnetHost2service } = await createMnetHost2service(validatedData);

    revalidatePath("/mnetHost2services"); // optional - assumes you will have named route same as entity

    return NextResponse.json(mnetHost2service, { status: 201 });
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

    const validatedData = updateMnetHost2serviceParams.parse(await req.json());
    const validatedParams = mnetHost2serviceIdSchema.parse({ id });

    const { mnetHost2service } = await updateMnetHost2service(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(mnetHost2service, { status: 200 });
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

    const validatedParams = mnetHost2serviceIdSchema.parse({ id });
    const { mnetHost2service } = await deleteMnetHost2service(
      validatedParams.id,
    );

    return NextResponse.json(mnetHost2service, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
