import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createBadge,
  deleteBadge,
  updateBadge,
} from "../../../lib/api/badges/mutations";
import {
  badgeIdSchema,
  insertBadgeParams,
  updateBadgeParams,
} from "../../../lib/db/schema/badges";

export async function POST(req: Request) {
  try {
    const validatedData = insertBadgeParams.parse(await req.json());
    const { badge } = await createBadge(validatedData);

    revalidatePath("/badges"); // optional - assumes you will have named route same as entity

    return NextResponse.json(badge, { status: 201 });
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

    const validatedData = updateBadgeParams.parse(await req.json());
    const validatedParams = badgeIdSchema.parse({ id });

    const { badge } = await updateBadge(validatedParams.id, validatedData);

    return NextResponse.json(badge, { status: 200 });
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

    const validatedParams = badgeIdSchema.parse({ id });
    const { badge } = await deleteBadge(validatedParams.id);

    return NextResponse.json(badge, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
