import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBadgeEndorsement,
  deleteBadgeEndorsement,
  updateBadgeEndorsement,
} from "@soco/badge-api/badgeEndorsements/mutations";
import { 
  badgeEndorsementIdSchema,
  insertBadgeEndorsementParams,
  updateBadgeEndorsementParams 
} from "@soco/badge-db/schema/badgeEndorsements";

export async function POST(req: Request) {
  try {
    const validatedData = insertBadgeEndorsementParams.parse(await req.json());
    const { badgeEndorsement } = await createBadgeEndorsement(validatedData);

    revalidatePath("/badgeEndorsements"); // optional - assumes you will have named route same as entity

    return NextResponse.json(badgeEndorsement, { status: 201 });
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

    const validatedData = updateBadgeEndorsementParams.parse(await req.json());
    const validatedParams = badgeEndorsementIdSchema.parse({ id });

    const { badgeEndorsement } = await updateBadgeEndorsement(validatedParams.id, validatedData);

    return NextResponse.json(badgeEndorsement, { status: 200 });
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

    const validatedParams = badgeEndorsementIdSchema.parse({ id });
    const { badgeEndorsement } = await deleteBadgeEndorsement(validatedParams.id);

    return NextResponse.json(badgeEndorsement, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
