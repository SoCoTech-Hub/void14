import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createUserInfoField,
  deleteUserInfoField,
  updateUserInfoField,
} from "../../../lib/api/userInfoFields/mutations";
import {
  insertUserInfoFieldParams,
  updateUserInfoFieldParams,
  userInfoFieldIdSchema,
} from "../../../lib/db/schema/userInfoFields";

export async function POST(req: Request) {
  try {
    const validatedData = insertUserInfoFieldParams.parse(await req.json());
    const { userInfoField } = await createUserInfoField(validatedData);

    revalidatePath("/userInfoFields"); // optional - assumes you will have named route same as entity

    return NextResponse.json(userInfoField, { status: 201 });
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

    const validatedData = updateUserInfoFieldParams.parse(await req.json());
    const validatedParams = userInfoFieldIdSchema.parse({ id });

    const { userInfoField } = await updateUserInfoField(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(userInfoField, { status: 200 });
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

    const validatedParams = userInfoFieldIdSchema.parse({ id });
    const { userInfoField } = await deleteUserInfoField(validatedParams.id);

    return NextResponse.json(userInfoField, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
