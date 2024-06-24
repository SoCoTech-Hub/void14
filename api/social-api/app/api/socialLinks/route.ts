import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createSocialLink,
  deleteSocialLink,
  updateSocialLink,
} from "@/lib/api/socialLinks/mutations";
import { 
  socialLinkIdSchema,
  insertSocialLinkParams,
  updateSocialLinkParams 
} from "@/lib/db/schema/socialLinks";

export async function POST(req: Request) {
  try {
    const validatedData = insertSocialLinkParams.parse(await req.json());
    const { socialLink } = await createSocialLink(validatedData);

    revalidatePath("/socialLinks"); // optional - assumes you will have named route same as entity

    return NextResponse.json(socialLink, { status: 201 });
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

    const validatedData = updateSocialLinkParams.parse(await req.json());
    const validatedParams = socialLinkIdSchema.parse({ id });

    const { socialLink } = await updateSocialLink(validatedParams.id, validatedData);

    return NextResponse.json(socialLink, { status: 200 });
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

    const validatedParams = socialLinkIdSchema.parse({ id });
    const { socialLink } = await deleteSocialLink(validatedParams.id);

    return NextResponse.json(socialLink, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
