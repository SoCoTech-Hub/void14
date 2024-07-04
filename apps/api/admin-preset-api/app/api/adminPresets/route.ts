import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createAdminPreset,
  deleteAdminPreset,
  updateAdminPreset,
} from "../../../lib/api/adminPresets/mutations";
import {
  adminPresetIdSchema,
  insertAdminPresetParams,
  updateAdminPresetParams,
} from "../../../lib/db/schema/adminPresets";

export async function POST(req: Request) {
  try {
    const validatedData = insertAdminPresetParams.parse(await req.json());
    const { adminPreset } = await createAdminPreset(validatedData);

    revalidatePath("/adminPresets"); // optional - assumes you will have named route same as entity

    return NextResponse.json(adminPreset, { status: 201 });
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

    const validatedData = updateAdminPresetParams.parse(await req.json());
    const validatedParams = adminPresetIdSchema.parse({ id });

    const { adminPreset } = await updateAdminPreset(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(adminPreset, { status: 200 });
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

    const validatedParams = adminPresetIdSchema.parse({ id });
    const { adminPreset } = await deleteAdminPreset(validatedParams.id);

    return NextResponse.json(adminPreset, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
