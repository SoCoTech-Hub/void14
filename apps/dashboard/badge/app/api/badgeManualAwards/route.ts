import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBadgeManualAward,
  deleteBadgeManualAward,
  updateBadgeManualAward,
} from "@soco/badge-api/badgeManualAwards/mutations";
import { 
  badgeManualAwardIdSchema,
  insertBadgeManualAwardParams,
  updateBadgeManualAwardParams 
} from "@soco/badge-db/schema/badgeManualAwards";

export async function POST(req: Request) {
  try {
    const validatedData = insertBadgeManualAwardParams.parse(await req.json());
    const { badgeManualAward } = await createBadgeManualAward(validatedData);

    revalidatePath("/badgeManualAwards"); // optional - assumes you will have named route same as entity

    return NextResponse.json(badgeManualAward, { status: 201 });
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

    const validatedData = updateBadgeManualAwardParams.parse(await req.json());
    const validatedParams = badgeManualAwardIdSchema.parse({ id });

    const { badgeManualAward } = await updateBadgeManualAward(validatedParams.id, validatedData);

    return NextResponse.json(badgeManualAward, { status: 200 });
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

    const validatedParams = badgeManualAwardIdSchema.parse({ id });
    const { badgeManualAward } = await deleteBadgeManualAward(validatedParams.id);

    return NextResponse.json(badgeManualAward, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
