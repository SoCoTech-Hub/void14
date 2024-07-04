import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createForumDigest,
  deleteForumDigest,
  updateForumDigest,
} from "../../../lib/api/forumDigests/mutations";
import {
  forumDigestIdSchema,
  insertForumDigestParams,
  updateForumDigestParams,
} from "../../../lib/db/schema/forumDigests";

export async function POST(req: Request) {
  try {
    const validatedData = insertForumDigestParams.parse(await req.json());
    const { forumDigest } = await createForumDigest(validatedData);

    revalidatePath("/forumDigests"); // optional - assumes you will have named route same as entity

    return NextResponse.json(forumDigest, { status: 201 });
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

    const validatedData = updateForumDigestParams.parse(await req.json());
    const validatedParams = forumDigestIdSchema.parse({ id });

    const { forumDigest } = await updateForumDigest(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(forumDigest, { status: 200 });
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

    const validatedParams = forumDigestIdSchema.parse({ id });
    const { forumDigest } = await deleteForumDigest(validatedParams.id);

    return NextResponse.json(forumDigest, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
