import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBadgeBackpackOauth2,
  deleteBadgeBackpackOauth2,
  updateBadgeBackpackOauth2,
} from "@soco/badge-api/badgeBackpackOauth2s/mutations";
import { 
  badgeBackpackOauth2IdSchema,
  insertBadgeBackpackOauth2Params,
  updateBadgeBackpackOauth2Params 
} from "@soco/badge-db/schema/badgeBackpackOauth2s";

export async function POST(req: Request) {
  try {
    const validatedData = insertBadgeBackpackOauth2Params.parse(await req.json());
    const { badgeBackpackOauth2 } = await createBadgeBackpackOauth2(validatedData);

    revalidatePath("/badgeBackpackOauth2s"); // optional - assumes you will have named route same as entity

    return NextResponse.json(badgeBackpackOauth2, { status: 201 });
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

    const validatedData = updateBadgeBackpackOauth2Params.parse(await req.json());
    const validatedParams = badgeBackpackOauth2IdSchema.parse({ id });

    const { badgeBackpackOauth2 } = await updateBadgeBackpackOauth2(validatedParams.id, validatedData);

    return NextResponse.json(badgeBackpackOauth2, { status: 200 });
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

    const validatedParams = badgeBackpackOauth2IdSchema.parse({ id });
    const { badgeBackpackOauth2 } = await deleteBadgeBackpackOauth2(validatedParams.id);

    return NextResponse.json(badgeBackpackOauth2, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
