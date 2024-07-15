import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createSocialIcon,
  deleteSocialIcon,
  updateSocialIcon,
} from "@soco/blog-api/socialIcons/mutations";
import { 
  socialIconIdSchema,
  insertSocialIconParams,
  updateSocialIconParams 
} from "@soco/blog-db/schema/socialIcons";

export async function POST(req: Request) {
  try {
    const validatedData = insertSocialIconParams.parse(await req.json());
    const { socialIcon } = await createSocialIcon(validatedData);

    revalidatePath("/socialIcons"); // optional - assumes you will have named route same as entity

    return NextResponse.json(socialIcon, { status: 201 });
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

    const validatedData = updateSocialIconParams.parse(await req.json());
    const validatedParams = socialIconIdSchema.parse({ id });

    const { socialIcon } = await updateSocialIcon(validatedParams.id, validatedData);

    return NextResponse.json(socialIcon, { status: 200 });
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

    const validatedParams = socialIconIdSchema.parse({ id });
    const { socialIcon } = await deleteSocialIcon(validatedParams.id);

    return NextResponse.json(socialIcon, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
