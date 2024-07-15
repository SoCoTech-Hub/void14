import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createOauth2AccessToken,
  deleteOauth2AccessToken,
  updateOauth2AccessToken,
} from "@soco/oauth2-api/oauth2AccessTokens/mutations";
import { 
  oauth2AccessTokenIdSchema,
  insertOauth2AccessTokenParams,
  updateOauth2AccessTokenParams 
} from "@soco/oauth2-db/schema/oauth2AccessTokens";

export async function POST(req: Request) {
  try {
    const validatedData = insertOauth2AccessTokenParams.parse(await req.json());
    const { oauth2AccessToken } = await createOauth2AccessToken(validatedData);

    revalidatePath("/oauth2AccessTokens"); // optional - assumes you will have named route same as entity

    return NextResponse.json(oauth2AccessToken, { status: 201 });
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

    const validatedData = updateOauth2AccessTokenParams.parse(await req.json());
    const validatedParams = oauth2AccessTokenIdSchema.parse({ id });

    const { oauth2AccessToken } = await updateOauth2AccessToken(validatedParams.id, validatedData);

    return NextResponse.json(oauth2AccessToken, { status: 200 });
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

    const validatedParams = oauth2AccessTokenIdSchema.parse({ id });
    const { oauth2AccessToken } = await deleteOauth2AccessToken(validatedParams.id);

    return NextResponse.json(oauth2AccessToken, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
