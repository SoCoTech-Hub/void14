import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAdminPresetItA,
  deleteAdminPresetItA,
  updateAdminPresetItA,
} from "@/lib/api/adminPresetItAs/mutations";
import { 
  adminPresetItAIdSchema,
  insertAdminPresetItAParams,
  updateAdminPresetItAParams 
} from "@/lib/db/schema/adminPresetItAs";

export async function POST(req: Request) {
  try {
    const validatedData = insertAdminPresetItAParams.parse(await req.json());
    const { adminPresetItA } = await createAdminPresetItA(validatedData);

    revalidatePath("/adminPresetItAs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(adminPresetItA, { status: 201 });
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

    const validatedData = updateAdminPresetItAParams.parse(await req.json());
    const validatedParams = adminPresetItAIdSchema.parse({ id });

    const { adminPresetItA } = await updateAdminPresetItA(validatedParams.id, validatedData);

    return NextResponse.json(adminPresetItA, { status: 200 });
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

    const validatedParams = adminPresetItAIdSchema.parse({ id });
    const { adminPresetItA } = await deleteAdminPresetItA(validatedParams.id);

    return NextResponse.json(adminPresetItA, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
