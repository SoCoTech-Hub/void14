import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createRoleAllowAssign,
  deleteRoleAllowAssign,
  updateRoleAllowAssign,
} from "@soco/role-api/roleAllowAssigns/mutations";
import { 
  roleAllowAssignIdSchema,
  insertRoleAllowAssignParams,
  updateRoleAllowAssignParams 
} from "@soco/role-db/schema/roleAllowAssigns";

export async function POST(req: Request) {
  try {
    const validatedData = insertRoleAllowAssignParams.parse(await req.json());
    const { roleAllowAssign } = await createRoleAllowAssign(validatedData);

    revalidatePath("/roleAllowAssigns"); // optional - assumes you will have named route same as entity

    return NextResponse.json(roleAllowAssign, { status: 201 });
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

    const validatedData = updateRoleAllowAssignParams.parse(await req.json());
    const validatedParams = roleAllowAssignIdSchema.parse({ id });

    const { roleAllowAssign } = await updateRoleAllowAssign(validatedParams.id, validatedData);

    return NextResponse.json(roleAllowAssign, { status: 200 });
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

    const validatedParams = roleAllowAssignIdSchema.parse({ id });
    const { roleAllowAssign } = await deleteRoleAllowAssign(validatedParams.id);

    return NextResponse.json(roleAllowAssign, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
