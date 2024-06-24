import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createLtiAccessToken,
  deleteLtiAccessToken,
  updateLtiAccessToken,
} from "@/lib/api/ltiAccessTokens/mutations";
import { 
  ltiAccessTokenIdSchema,
  insertLtiAccessTokenParams,
  updateLtiAccessTokenParams 
} from "@/lib/db/schema/ltiAccessTokens";

export async function POST(req: Request) {
  try {
    const validatedData = insertLtiAccessTokenParams.parse(await req.json());
    const { ltiAccessToken } = await createLtiAccessToken(validatedData);

    revalidatePath("/ltiAccessTokens"); // optional - assumes you will have named route same as entity

    return NextResponse.json(ltiAccessToken, { status: 201 });
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

    const validatedData = updateLtiAccessTokenParams.parse(await req.json());
    const validatedParams = ltiAccessTokenIdSchema.parse({ id });

    const { ltiAccessToken } = await updateLtiAccessToken(validatedParams.id, validatedData);

    return NextResponse.json(ltiAccessToken, { status: 200 });
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

    const validatedParams = ltiAccessTokenIdSchema.parse({ id });
    const { ltiAccessToken } = await deleteLtiAccessToken(validatedParams.id);

    return NextResponse.json(ltiAccessToken, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
