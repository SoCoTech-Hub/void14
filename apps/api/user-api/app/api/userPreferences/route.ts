import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createUserPreference,
  deleteUserPreference,
  updateUserPreference,
} from "../../../lib/api/userPreferences/mutations";
import {
  insertUserPreferenceParams,
  updateUserPreferenceParams,
  userPreferenceIdSchema,
} from "../../../lib/db/schema/userPreferences";

export async function POST(req: Request) {
  try {
    const validatedData = insertUserPreferenceParams.parse(await req.json());
    const { userPreference } = await createUserPreference(validatedData);

    revalidatePath("/userPreferences"); // optional - assumes you will have named route same as entity

    return NextResponse.json(userPreference, { status: 201 });
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

    const validatedData = updateUserPreferenceParams.parse(await req.json());
    const validatedParams = userPreferenceIdSchema.parse({ id });

    const { userPreference } = await updateUserPreference(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(userPreference, { status: 200 });
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

    const validatedParams = userPreferenceIdSchema.parse({ id });
    const { userPreference } = await deleteUserPreference(validatedParams.id);

    return NextResponse.json(userPreference, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
