import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createOauth2Issuer,
  deleteOauth2Issuer,
  updateOauth2Issuer,
} from "@/lib/api/oauth2Issuers/mutations";
import { 
  oauth2IssuerIdSchema,
  insertOauth2IssuerParams,
  updateOauth2IssuerParams 
} from "@/lib/db/schema/oauth2Issuers";

export async function POST(req: Request) {
  try {
    const validatedData = insertOauth2IssuerParams.parse(await req.json());
    const { oauth2Issuer } = await createOauth2Issuer(validatedData);

    revalidatePath("/oauth2Issuers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(oauth2Issuer, { status: 201 });
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

    const validatedData = updateOauth2IssuerParams.parse(await req.json());
    const validatedParams = oauth2IssuerIdSchema.parse({ id });

    const { oauth2Issuer } = await updateOauth2Issuer(validatedParams.id, validatedData);

    return NextResponse.json(oauth2Issuer, { status: 200 });
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

    const validatedParams = oauth2IssuerIdSchema.parse({ id });
    const { oauth2Issuer } = await deleteOauth2Issuer(validatedParams.id);

    return NextResponse.json(oauth2Issuer, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
