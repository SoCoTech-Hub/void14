import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createMnetServiceEnrolEnrolment,
  deleteMnetServiceEnrolEnrolment,
  updateMnetServiceEnrolEnrolment,
} from "../../../lib/api/mnetServiceEnrolEnrolments/mutations";
import {
  insertMnetServiceEnrolEnrolmentParams,
  mnetServiceEnrolEnrolmentIdSchema,
  updateMnetServiceEnrolEnrolmentParams,
} from "../../../lib/db/schema/mnetServiceEnrolEnrolments";

export async function POST(req: Request) {
  try {
    const validatedData = insertMnetServiceEnrolEnrolmentParams.parse(
      await req.json(),
    );
    const { mnetServiceEnrolEnrolment } =
      await createMnetServiceEnrolEnrolment(validatedData);

    revalidatePath("/mnetServiceEnrolEnrolments"); // optional - assumes you will have named route same as entity

    return NextResponse.json(mnetServiceEnrolEnrolment, { status: 201 });
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

    const validatedData = updateMnetServiceEnrolEnrolmentParams.parse(
      await req.json(),
    );
    const validatedParams = mnetServiceEnrolEnrolmentIdSchema.parse({ id });

    const { mnetServiceEnrolEnrolment } = await updateMnetServiceEnrolEnrolment(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(mnetServiceEnrolEnrolment, { status: 200 });
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

    const validatedParams = mnetServiceEnrolEnrolmentIdSchema.parse({ id });
    const { mnetServiceEnrolEnrolment } = await deleteMnetServiceEnrolEnrolment(
      validatedParams.id,
    );

    return NextResponse.json(mnetServiceEnrolEnrolment, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
