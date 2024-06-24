import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createUserLastAccess,
  deleteUserLastAccess,
  updateUserLastAccess,
} from "@/lib/api/userLastAccesses/mutations";
import { 
  userLastAccessIdSchema,
  insertUserLastAccessParams,
  updateUserLastAccessParams 
} from "@/lib/db/schema/userLastAccesses";

export async function POST(req: Request) {
  try {
    const validatedData = insertUserLastAccessParams.parse(await req.json());
    const { userLastAccess } = await createUserLastAccess(validatedData);

    revalidatePath("/userLastAccesses"); // optional - assumes you will have named route same as entity

    return NextResponse.json(userLastAccess, { status: 201 });
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

    const validatedData = updateUserLastAccessParams.parse(await req.json());
    const validatedParams = userLastAccessIdSchema.parse({ id });

    const { userLastAccess } = await updateUserLastAccess(validatedParams.id, validatedData);

    return NextResponse.json(userLastAccess, { status: 200 });
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

    const validatedParams = userLastAccessIdSchema.parse({ id });
    const { userLastAccess } = await deleteUserLastAccess(validatedParams.id);

    return NextResponse.json(userLastAccess, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
