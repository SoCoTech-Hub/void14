import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createOauth2SystemAccount,
  deleteOauth2SystemAccount,
  updateOauth2SystemAccount,
} from "@soco/oauth2-api/oauth2SystemAccounts/mutations";
import { 
  oauth2SystemAccountIdSchema,
  insertOauth2SystemAccountParams,
  updateOauth2SystemAccountParams 
} from "@soco/oauth2-db/schema/oauth2SystemAccounts";

export async function POST(req: Request) {
  try {
    const validatedData = insertOauth2SystemAccountParams.parse(await req.json());
    const { oauth2SystemAccount } = await createOauth2SystemAccount(validatedData);

    revalidatePath("/oauth2SystemAccounts"); // optional - assumes you will have named route same as entity

    return NextResponse.json(oauth2SystemAccount, { status: 201 });
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

    const validatedData = updateOauth2SystemAccountParams.parse(await req.json());
    const validatedParams = oauth2SystemAccountIdSchema.parse({ id });

    const { oauth2SystemAccount } = await updateOauth2SystemAccount(validatedParams.id, validatedData);

    return NextResponse.json(oauth2SystemAccount, { status: 200 });
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

    const validatedParams = oauth2SystemAccountIdSchema.parse({ id });
    const { oauth2SystemAccount } = await deleteOauth2SystemAccount(validatedParams.id);

    return NextResponse.json(oauth2SystemAccount, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
