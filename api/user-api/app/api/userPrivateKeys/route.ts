import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createUserPrivateKey,
  deleteUserPrivateKey,
  updateUserPrivateKey,
} from "@/lib/api/userPrivateKeys/mutations";
import { 
  userPrivateKeyIdSchema,
  insertUserPrivateKeyParams,
  updateUserPrivateKeyParams 
} from "@/lib/db/schema/userPrivateKeys";

export async function POST(req: Request) {
  try {
    const validatedData = insertUserPrivateKeyParams.parse(await req.json());
    const { userPrivateKey } = await createUserPrivateKey(validatedData);

    revalidatePath("/userPrivateKeys"); // optional - assumes you will have named route same as entity

    return NextResponse.json(userPrivateKey, { status: 201 });
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

    const validatedData = updateUserPrivateKeyParams.parse(await req.json());
    const validatedParams = userPrivateKeyIdSchema.parse({ id });

    const { userPrivateKey } = await updateUserPrivateKey(validatedParams.id, validatedData);

    return NextResponse.json(userPrivateKey, { status: 200 });
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

    const validatedParams = userPrivateKeyIdSchema.parse({ id });
    const { userPrivateKey } = await deleteUserPrivateKey(validatedParams.id);

    return NextResponse.json(userPrivateKey, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
