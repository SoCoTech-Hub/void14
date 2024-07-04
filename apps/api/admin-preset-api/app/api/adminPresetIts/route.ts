import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createAdminPresetIt,
  deleteAdminPresetIt,
  updateAdminPresetIt,
} from "../../../lib/api/adminPresetIts/mutations";
import {
  adminPresetItIdSchema,
  insertAdminPresetItParams,
  updateAdminPresetItParams,
} from "../../../lib/db/schema/adminPresetIts";

export async function POST(req: Request) {
  try {
    const validatedData = insertAdminPresetItParams.parse(await req.json());
    const { adminPresetIt } = await createAdminPresetIt(validatedData);

    revalidatePath("/adminPresetIts"); // optional - assumes you will have named route same as entity

    return NextResponse.json(adminPresetIt, { status: 201 });
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

    const validatedData = updateAdminPresetItParams.parse(await req.json());
    const validatedParams = adminPresetItIdSchema.parse({ id });

    const { adminPresetIt } = await updateAdminPresetIt(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(adminPresetIt, { status: 200 });
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

    const validatedParams = adminPresetItIdSchema.parse({ id });
    const { adminPresetIt } = await deleteAdminPresetIt(validatedParams.id);

    return NextResponse.json(adminPresetIt, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
