import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createMnetHost,
  deleteMnetHost,
  updateMnetHost,
} from "../../../lib/api/mnetHosts/mutations";
import {
  insertMnetHostParams,
  mnetHostIdSchema,
  updateMnetHostParams,
} from "../../../lib/db/schema/mnetHosts";

export async function POST(req: Request) {
  try {
    const validatedData = insertMnetHostParams.parse(await req.json());
    const { mnetHost } = await createMnetHost(validatedData);

    revalidatePath("/mnetHosts"); // optional - assumes you will have named route same as entity

    return NextResponse.json(mnetHost, { status: 201 });
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

    const validatedData = updateMnetHostParams.parse(await req.json());
    const validatedParams = mnetHostIdSchema.parse({ id });

    const { mnetHost } = await updateMnetHost(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(mnetHost, { status: 200 });
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

    const validatedParams = mnetHostIdSchema.parse({ id });
    const { mnetHost } = await deleteMnetHost(validatedParams.id);

    return NextResponse.json(mnetHost, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
