import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createRoleAllowSwitch,
  deleteRoleAllowSwitch,
  updateRoleAllowSwitch,
} from "@/lib/api/roleAllowSwitches/mutations";
import { 
  roleAllowSwitchIdSchema,
  insertRoleAllowSwitchParams,
  updateRoleAllowSwitchParams 
} from "@/lib/db/schema/roleAllowSwitches";

export async function POST(req: Request) {
  try {
    const validatedData = insertRoleAllowSwitchParams.parse(await req.json());
    const { roleAllowSwitch } = await createRoleAllowSwitch(validatedData);

    revalidatePath("/roleAllowSwitches"); // optional - assumes you will have named route same as entity

    return NextResponse.json(roleAllowSwitch, { status: 201 });
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

    const validatedData = updateRoleAllowSwitchParams.parse(await req.json());
    const validatedParams = roleAllowSwitchIdSchema.parse({ id });

    const { roleAllowSwitch } = await updateRoleAllowSwitch(validatedParams.id, validatedData);

    return NextResponse.json(roleAllowSwitch, { status: 200 });
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

    const validatedParams = roleAllowSwitchIdSchema.parse({ id });
    const { roleAllowSwitch } = await deleteRoleAllowSwitch(validatedParams.id);

    return NextResponse.json(roleAllowSwitch, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
