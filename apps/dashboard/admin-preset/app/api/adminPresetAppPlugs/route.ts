import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAdminPresetAppPlug,
  deleteAdminPresetAppPlug,
  updateAdminPresetAppPlug,
} from "@/lib/api/adminPresetAppPlugs/mutations";
import { 
  adminPresetAppPlugIdSchema,
  insertAdminPresetAppPlugParams,
  updateAdminPresetAppPlugParams 
} from "@/lib/db/schema/adminPresetAppPlugs";

export async function POST(req: Request) {
  try {
    const validatedData = insertAdminPresetAppPlugParams.parse(await req.json());
    const { adminPresetAppPlug } = await createAdminPresetAppPlug(validatedData);

    revalidatePath("/adminPresetAppPlugs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(adminPresetAppPlug, { status: 201 });
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

    const validatedData = updateAdminPresetAppPlugParams.parse(await req.json());
    const validatedParams = adminPresetAppPlugIdSchema.parse({ id });

    const { adminPresetAppPlug } = await updateAdminPresetAppPlug(validatedParams.id, validatedData);

    return NextResponse.json(adminPresetAppPlug, { status: 200 });
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

    const validatedParams = adminPresetAppPlugIdSchema.parse({ id });
    const { adminPresetAppPlug } = await deleteAdminPresetAppPlug(validatedParams.id);

    return NextResponse.json(adminPresetAppPlug, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
