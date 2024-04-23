import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBadgeCriteriaParam,
  deleteBadgeCriteriaParam,
  updateBadgeCriteriaParam,
} from "@/lib/api/badgeCriteriaParams/mutations";
import { 
  badgeCriteriaParamIdSchema,
  insertBadgeCriteriaParamParams,
  updateBadgeCriteriaParamParams 
} from "@/lib/db/schema/badgeCriteriaParams";

export async function POST(req: Request) {
  try {
    const validatedData = insertBadgeCriteriaParamParams.parse(await req.json());
    const { badgeCriteriaParam } = await createBadgeCriteriaParam(validatedData);

    revalidatePath("/badgeCriteriaParams"); // optional - assumes you will have named route same as entity

    return NextResponse.json(badgeCriteriaParam, { status: 201 });
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

    const validatedData = updateBadgeCriteriaParamParams.parse(await req.json());
    const validatedParams = badgeCriteriaParamIdSchema.parse({ id });

    const { badgeCriteriaParam } = await updateBadgeCriteriaParam(validatedParams.id, validatedData);

    return NextResponse.json(badgeCriteriaParam, { status: 200 });
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

    const validatedParams = badgeCriteriaParamIdSchema.parse({ id });
    const { badgeCriteriaParam } = await deleteBadgeCriteriaParam(validatedParams.id);

    return NextResponse.json(badgeCriteriaParam, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
