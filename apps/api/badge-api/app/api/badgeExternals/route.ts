import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createBadgeExternal,
  deleteBadgeExternal,
  updateBadgeExternal,
} from "../../../lib/api/badgeExternals/mutations";
import {
  badgeExternalIdSchema,
  insertBadgeExternalParams,
  updateBadgeExternalParams,
} from "../../../lib/db/schema/badgeExternals";

export async function POST(req: Request) {
  try {
    const validatedData = insertBadgeExternalParams.parse(await req.json());
    const { badgeExternal } = await createBadgeExternal(validatedData);

    revalidatePath("/badgeExternals"); // optional - assumes you will have named route same as entity

    return NextResponse.json(badgeExternal, { status: 201 });
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

    const validatedData = updateBadgeExternalParams.parse(await req.json());
    const validatedParams = badgeExternalIdSchema.parse({ id });

    const { badgeExternal } = await updateBadgeExternal(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(badgeExternal, { status: 200 });
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

    const validatedParams = badgeExternalIdSchema.parse({ id });
    const { badgeExternal } = await deleteBadgeExternal(validatedParams.id);

    return NextResponse.json(badgeExternal, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
