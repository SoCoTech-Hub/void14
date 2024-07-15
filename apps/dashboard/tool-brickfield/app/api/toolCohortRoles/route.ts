import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createToolCohortRole,
  deleteToolCohortRole,
  updateToolCohortRole,
} from "@soco/tool-brickfield-api/toolCohortRoles/mutations";
import { 
  toolCohortRoleIdSchema,
  insertToolCohortRoleParams,
  updateToolCohortRoleParams 
} from "@soco/tool-brickfield-db/schema/toolCohortRoles";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolCohortRoleParams.parse(await req.json());
    const { toolCohortRole } = await createToolCohortRole(validatedData);

    revalidatePath("/toolCohortRoles"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolCohortRole, { status: 201 });
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

    const validatedData = updateToolCohortRoleParams.parse(await req.json());
    const validatedParams = toolCohortRoleIdSchema.parse({ id });

    const { toolCohortRole } = await updateToolCohortRole(validatedParams.id, validatedData);

    return NextResponse.json(toolCohortRole, { status: 200 });
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

    const validatedParams = toolCohortRoleIdSchema.parse({ id });
    const { toolCohortRole } = await deleteToolCohortRole(validatedParams.id);

    return NextResponse.json(toolCohortRole, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
