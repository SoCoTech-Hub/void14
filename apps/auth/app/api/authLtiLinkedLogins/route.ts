import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAuthLtiLinkedLogin,
  deleteAuthLtiLinkedLogin,
  updateAuthLtiLinkedLogin,
} from "@/lib/api/authLtiLinkedLogins/mutations";
import { 
  authLtiLinkedLoginIdSchema,
  insertAuthLtiLinkedLoginParams,
  updateAuthLtiLinkedLoginParams 
} from "@/lib/db/schema/authLtiLinkedLogins";

export async function POST(req: Request) {
  try {
    const validatedData = insertAuthLtiLinkedLoginParams.parse(await req.json());
    const { authLtiLinkedLogin } = await createAuthLtiLinkedLogin(validatedData);

    revalidatePath("/authLtiLinkedLogins"); // optional - assumes you will have named route same as entity

    return NextResponse.json(authLtiLinkedLogin, { status: 201 });
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

    const validatedData = updateAuthLtiLinkedLoginParams.parse(await req.json());
    const validatedParams = authLtiLinkedLoginIdSchema.parse({ id });

    const { authLtiLinkedLogin } = await updateAuthLtiLinkedLogin(validatedParams.id, validatedData);

    return NextResponse.json(authLtiLinkedLogin, { status: 200 });
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

    const validatedParams = authLtiLinkedLoginIdSchema.parse({ id });
    const { authLtiLinkedLogin } = await deleteAuthLtiLinkedLogin(validatedParams.id);

    return NextResponse.json(authLtiLinkedLogin, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
