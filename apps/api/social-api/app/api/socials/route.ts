import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createSocial,
  deleteSocial,
  updateSocial,
} from "../../../lib/api/socials/mutations";
import {
  insertSocialParams,
  socialIdSchema,
  updateSocialParams,
} from "../../../lib/db/schema/socials";

export async function POST(req: Request) {
  try {
    const validatedData = insertSocialParams.parse(await req.json());
    const { social } = await createSocial(validatedData);

    revalidatePath("/socials"); // optional - assumes you will have named route same as entity

    return NextResponse.json(social, { status: 201 });
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

    const validatedData = updateSocialParams.parse(await req.json());
    const validatedParams = socialIdSchema.parse({ id });

    const { social } = await updateSocial(validatedParams.id, validatedData);

    return NextResponse.json(social, { status: 200 });
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

    const validatedParams = socialIdSchema.parse({ id });
    const { social } = await deleteSocial(validatedParams.id);

    return NextResponse.json(social, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
