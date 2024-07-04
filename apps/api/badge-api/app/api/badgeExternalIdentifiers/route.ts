import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createBadgeExternalIdentifier,
  deleteBadgeExternalIdentifier,
  updateBadgeExternalIdentifier,
} from "../../../lib/api/badgeExternalIdentifiers/mutations";
import {
  badgeExternalIdentifierIdSchema,
  insertBadgeExternalIdentifierParams,
  updateBadgeExternalIdentifierParams,
} from "../../../lib/db/schema/badgeExternalIdentifiers";

export async function POST(req: Request) {
  try {
    const validatedData = insertBadgeExternalIdentifierParams.parse(
      await req.json(),
    );
    const { badgeExternalIdentifier } =
      await createBadgeExternalIdentifier(validatedData);

    revalidatePath("/badgeExternalIdentifiers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(badgeExternalIdentifier, { status: 201 });
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

    const validatedData = updateBadgeExternalIdentifierParams.parse(
      await req.json(),
    );
    const validatedParams = badgeExternalIdentifierIdSchema.parse({ id });

    const { badgeExternalIdentifier } = await updateBadgeExternalIdentifier(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(badgeExternalIdentifier, { status: 200 });
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

    const validatedParams = badgeExternalIdentifierIdSchema.parse({ id });
    const { badgeExternalIdentifier } = await deleteBadgeExternalIdentifier(
      validatedParams.id,
    );

    return NextResponse.json(badgeExternalIdentifier, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
