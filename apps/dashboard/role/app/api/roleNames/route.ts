import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createRoleName,
  deleteRoleName,
  updateRoleName,
} from "@soco/role-api/roleNames/mutations";
import { 
  roleNameIdSchema,
  insertRoleNameParams,
  updateRoleNameParams 
} from "@soco/role-db/schema/roleNames";

export async function POST(req: Request) {
  try {
    const validatedData = insertRoleNameParams.parse(await req.json());
    const { roleName } = await createRoleName(validatedData);

    revalidatePath("/roleNames"); // optional - assumes you will have named route same as entity

    return NextResponse.json(roleName, { status: 201 });
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

    const validatedData = updateRoleNameParams.parse(await req.json());
    const validatedParams = roleNameIdSchema.parse({ id });

    const { roleName } = await updateRoleName(validatedParams.id, validatedData);

    return NextResponse.json(roleName, { status: 200 });
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

    const validatedParams = roleNameIdSchema.parse({ id });
    const { roleName } = await deleteRoleName(validatedParams.id);

    return NextResponse.json(roleName, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
