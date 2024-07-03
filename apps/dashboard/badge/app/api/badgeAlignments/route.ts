import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBadgeAlignment,
  deleteBadgeAlignment,
  updateBadgeAlignment,
} from "@/lib/api/badgeAlignments/mutations";
import { 
  badgeAlignmentIdSchema,
  insertBadgeAlignmentParams,
  updateBadgeAlignmentParams 
} from "@/lib/db/schema/badgeAlignments";

export async function POST(req: Request) {
  try {
    const validatedData = insertBadgeAlignmentParams.parse(await req.json());
    const { badgeAlignment } = await createBadgeAlignment(validatedData);

    revalidatePath("/badgeAlignments"); // optional - assumes you will have named route same as entity

    return NextResponse.json(badgeAlignment, { status: 201 });
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

    const validatedData = updateBadgeAlignmentParams.parse(await req.json());
    const validatedParams = badgeAlignmentIdSchema.parse({ id });

    const { badgeAlignment } = await updateBadgeAlignment(validatedParams.id, validatedData);

    return NextResponse.json(badgeAlignment, { status: 200 });
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

    const validatedParams = badgeAlignmentIdSchema.parse({ id });
    const { badgeAlignment } = await deleteBadgeAlignment(validatedParams.id);

    return NextResponse.json(badgeAlignment, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
