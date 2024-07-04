import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createInmail,
  deleteInmail,
  updateInmail,
} from "../../../lib/api/inmails/mutations";
import {
  inmailIdSchema,
  insertInmailParams,
  updateInmailParams,
} from "../../../lib/db/schema/inmails";

export async function POST(req: Request) {
  try {
    const validatedData = insertInmailParams.parse(await req.json());
    const { inmail } = await createInmail(validatedData);

    revalidatePath("/inmails"); // optional - assumes you will have named route same as entity

    return NextResponse.json(inmail, { status: 201 });
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

    const validatedData = updateInmailParams.parse(await req.json());
    const validatedParams = inmailIdSchema.parse({ id });

    const { inmail } = await updateInmail(validatedParams.id, validatedData);

    return NextResponse.json(inmail, { status: 200 });
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

    const validatedParams = inmailIdSchema.parse({ id });
    const { inmail } = await deleteInmail(validatedParams.id);

    return NextResponse.json(inmail, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
