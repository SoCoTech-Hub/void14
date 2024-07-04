import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createBadgeCriteriaMet,
  deleteBadgeCriteriaMet,
  updateBadgeCriteriaMet,
} from "../../../lib/api/badgeCriteriaMets/mutations";
import {
  badgeCriteriaMetIdSchema,
  insertBadgeCriteriaMetParams,
  updateBadgeCriteriaMetParams,
} from "../../../lib/db/schema/badgeCriteriaMets";

export async function POST(req: Request) {
  try {
    const validatedData = insertBadgeCriteriaMetParams.parse(await req.json());
    const { badgeCriteriaMet } = await createBadgeCriteriaMet(validatedData);

    revalidatePath("/badgeCriteriaMets"); // optional - assumes you will have named route same as entity

    return NextResponse.json(badgeCriteriaMet, { status: 201 });
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

    const validatedData = updateBadgeCriteriaMetParams.parse(await req.json());
    const validatedParams = badgeCriteriaMetIdSchema.parse({ id });

    const { badgeCriteriaMet } = await updateBadgeCriteriaMet(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(badgeCriteriaMet, { status: 200 });
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

    const validatedParams = badgeCriteriaMetIdSchema.parse({ id });
    const { badgeCriteriaMet } = await deleteBadgeCriteriaMet(
      validatedParams.id,
    );

    return NextResponse.json(badgeCriteriaMet, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
