import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createMnetApplication,
  deleteMnetApplication,
  updateMnetApplication,
} from "../../../lib/api/mnetApplications/mutations";
import {
  insertMnetApplicationParams,
  mnetApplicationIdSchema,
  updateMnetApplicationParams,
} from "../../../lib/db/schema/mnetApplications";

export async function POST(req: Request) {
  try {
    const validatedData = insertMnetApplicationParams.parse(await req.json());
    const { mnetApplication } = await createMnetApplication(validatedData);

    revalidatePath("/mnetApplications"); // optional - assumes you will have named route same as entity

    return NextResponse.json(mnetApplication, { status: 201 });
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

    const validatedData = updateMnetApplicationParams.parse(await req.json());
    const validatedParams = mnetApplicationIdSchema.parse({ id });

    const { mnetApplication } = await updateMnetApplication(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(mnetApplication, { status: 200 });
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

    const validatedParams = mnetApplicationIdSchema.parse({ id });
    const { mnetApplication } = await deleteMnetApplication(validatedParams.id);

    return NextResponse.json(mnetApplication, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
