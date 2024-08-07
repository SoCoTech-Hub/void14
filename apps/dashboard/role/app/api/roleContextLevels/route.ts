import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createRoleContextLevel,
  deleteRoleContextLevel,
  updateRoleContextLevel,
} from "@soco/role-api/roleContextLevels/mutations";
import { 
  roleContextLevelIdSchema,
  insertRoleContextLevelParams,
  updateRoleContextLevelParams 
} from "@soco/role-db/schema/roleContextLevels";

export async function POST(req: Request) {
  try {
    const validatedData = insertRoleContextLevelParams.parse(await req.json());
    const { roleContextLevel } = await createRoleContextLevel(validatedData);

    revalidatePath("/roleContextLevels"); // optional - assumes you will have named route same as entity

    return NextResponse.json(roleContextLevel, { status: 201 });
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

    const validatedData = updateRoleContextLevelParams.parse(await req.json());
    const validatedParams = roleContextLevelIdSchema.parse({ id });

    const { roleContextLevel } = await updateRoleContextLevel(validatedParams.id, validatedData);

    return NextResponse.json(roleContextLevel, { status: 200 });
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

    const validatedParams = roleContextLevelIdSchema.parse({ id });
    const { roleContextLevel } = await deleteRoleContextLevel(validatedParams.id);

    return NextResponse.json(roleContextLevel, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
