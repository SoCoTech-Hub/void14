import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createLocalizationUser,
  deleteLocalizationUser,
  updateLocalizationUser,
} from "../../../lib/api/localizationUsers/mutations";
import {
  insertLocalizationUserParams,
  localizationUserIdSchema,
  updateLocalizationUserParams,
} from "../../../lib/db/schema/localizationUsers";

export async function POST(req: Request) {
  try {
    const validatedData = insertLocalizationUserParams.parse(await req.json());
    const { localizationUser } = await createLocalizationUser(validatedData);

    revalidatePath("/localizationUsers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(localizationUser, { status: 201 });
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

    const validatedData = updateLocalizationUserParams.parse(await req.json());
    const validatedParams = localizationUserIdSchema.parse({ id });

    const { localizationUser } = await updateLocalizationUser(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(localizationUser, { status: 200 });
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

    const validatedParams = localizationUserIdSchema.parse({ id });
    const { localizationUser } = await deleteLocalizationUser(
      validatedParams.id,
    );

    return NextResponse.json(localizationUser, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
