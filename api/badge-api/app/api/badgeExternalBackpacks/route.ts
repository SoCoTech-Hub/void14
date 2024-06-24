import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createBadgeExternalBackpack,
  deleteBadgeExternalBackpack,
  updateBadgeExternalBackpack,
} from "@/lib/api/badgeExternalBackpacks/mutations";
import { 
  badgeExternalBackpackIdSchema,
  insertBadgeExternalBackpackParams,
  updateBadgeExternalBackpackParams 
} from "@/lib/db/schema/badgeExternalBackpacks";

export async function POST(req: Request) {
  try {
    const validatedData = insertBadgeExternalBackpackParams.parse(await req.json());
    const { badgeExternalBackpack } = await createBadgeExternalBackpack(validatedData);

    revalidatePath("/badgeExternalBackpacks"); // optional - assumes you will have named route same as entity

    return NextResponse.json(badgeExternalBackpack, { status: 201 });
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

    const validatedData = updateBadgeExternalBackpackParams.parse(await req.json());
    const validatedParams = badgeExternalBackpackIdSchema.parse({ id });

    const { badgeExternalBackpack } = await updateBadgeExternalBackpack(validatedParams.id, validatedData);

    return NextResponse.json(badgeExternalBackpack, { status: 200 });
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

    const validatedParams = badgeExternalBackpackIdSchema.parse({ id });
    const { badgeExternalBackpack } = await deleteBadgeExternalBackpack(validatedParams.id);

    return NextResponse.json(badgeExternalBackpack, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
