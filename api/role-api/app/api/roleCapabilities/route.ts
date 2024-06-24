import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createRoleCapability,
  deleteRoleCapability,
  updateRoleCapability,
} from "@/lib/api/roleCapabilities/mutations";
import { 
  roleCapabilityIdSchema,
  insertRoleCapabilityParams,
  updateRoleCapabilityParams 
} from "@/lib/db/schema/roleCapabilities";

export async function POST(req: Request) {
  try {
    const validatedData = insertRoleCapabilityParams.parse(await req.json());
    const { roleCapability } = await createRoleCapability(validatedData);

    revalidatePath("/roleCapabilities"); // optional - assumes you will have named route same as entity

    return NextResponse.json(roleCapability, { status: 201 });
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

    const validatedData = updateRoleCapabilityParams.parse(await req.json());
    const validatedParams = roleCapabilityIdSchema.parse({ id });

    const { roleCapability } = await updateRoleCapability(validatedParams.id, validatedData);

    return NextResponse.json(roleCapability, { status: 200 });
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

    const validatedParams = roleCapabilityIdSchema.parse({ id });
    const { roleCapability } = await deleteRoleCapability(validatedParams.id);

    return NextResponse.json(roleCapability, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
