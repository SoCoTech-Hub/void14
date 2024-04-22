import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAuthOauth2LinkedLogin,
  deleteAuthOauth2LinkedLogin,
  updateAuthOauth2LinkedLogin,
} from "@/lib/api/authOauth2LinkedLogins/mutations";
import { 
  authOauth2LinkedLoginIdSchema,
  insertAuthOauth2LinkedLoginParams,
  updateAuthOauth2LinkedLoginParams 
} from "@/lib/db/schema/authOauth2LinkedLogins";

export async function POST(req: Request) {
  try {
    const validatedData = insertAuthOauth2LinkedLoginParams.parse(await req.json());
    const { authOauth2LinkedLogin } = await createAuthOauth2LinkedLogin(validatedData);

    revalidatePath("/authOauth2LinkedLogins"); // optional - assumes you will have named route same as entity

    return NextResponse.json(authOauth2LinkedLogin, { status: 201 });
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

    const validatedData = updateAuthOauth2LinkedLoginParams.parse(await req.json());
    const validatedParams = authOauth2LinkedLoginIdSchema.parse({ id });

    const { authOauth2LinkedLogin } = await updateAuthOauth2LinkedLogin(validatedParams.id, validatedData);

    return NextResponse.json(authOauth2LinkedLogin, { status: 200 });
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

    const validatedParams = authOauth2LinkedLoginIdSchema.parse({ id });
    const { authOauth2LinkedLogin } = await deleteAuthOauth2LinkedLogin(validatedParams.id);

    return NextResponse.json(authOauth2LinkedLogin, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
