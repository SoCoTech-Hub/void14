import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createPaygwPaypal,
  deletePaygwPaypal,
  updatePaygwPaypal,
} from "../../../lib/api/paygwPaypals/mutations";
import {
  insertPaygwPaypalParams,
  paygwPaypalIdSchema,
  updatePaygwPaypalParams,
} from "../../../lib/db/schema/paygwPaypals";

export async function POST(req: Request) {
  try {
    const validatedData = insertPaygwPaypalParams.parse(await req.json());
    const { paygwPaypal } = await createPaygwPaypal(validatedData);

    revalidatePath("/paygwPaypals"); // optional - assumes you will have named route same as entity

    return NextResponse.json(paygwPaypal, { status: 201 });
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

    const validatedData = updatePaygwPaypalParams.parse(await req.json());
    const validatedParams = paygwPaypalIdSchema.parse({ id });

    const { paygwPaypal } = await updatePaygwPaypal(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(paygwPaypal, { status: 200 });
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

    const validatedParams = paygwPaypalIdSchema.parse({ id });
    const { paygwPaypal } = await deletePaygwPaypal(validatedParams.id);

    return NextResponse.json(paygwPaypal, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
