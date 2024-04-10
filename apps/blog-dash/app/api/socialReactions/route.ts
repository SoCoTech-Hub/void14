import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createSocialReaction,
  deleteSocialReaction,
  updateSocialReaction,
} from "@/lib/api/socialReactions/mutations";
import { 
  socialReactionIdSchema,
  insertSocialReactionParams,
  updateSocialReactionParams 
} from "@/lib/db/schema/socialReactions";

export async function POST(req: Request) {
  try {
    const validatedData = insertSocialReactionParams.parse(await req.json());
    const { socialReaction } = await createSocialReaction(validatedData);

    revalidatePath("/socialReactions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(socialReaction, { status: 201 });
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

    const validatedData = updateSocialReactionParams.parse(await req.json());
    const validatedParams = socialReactionIdSchema.parse({ id });

    const { socialReaction } = await updateSocialReaction(validatedParams.id, validatedData);

    return NextResponse.json(socialReaction, { status: 200 });
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

    const validatedParams = socialReactionIdSchema.parse({ id });
    const { socialReaction } = await deleteSocialReaction(validatedParams.id);

    return NextResponse.json(socialReaction, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
