import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createToolCohortRole,
  deleteToolCohortRole,
  updateToolCohortRole,
} from "../../../lib/api/toolCohortRoles/mutations";
import {
  insertToolCohortRoleParams,
  toolCohortRoleIdSchema,
  updateToolCohortRoleParams,
} from "../../../lib/db/schema/toolCohortRoles";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolCohortRoleParams.parse(await req.json());
    const { toolCohortRole } = await createToolCohortRole(validatedData);

    revalidatePath("/toolCohortRoles"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolCohortRole, { status: 201 });
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

    const validatedData = updateToolCohortRoleParams.parse(await req.json());
    const validatedParams = toolCohortRoleIdSchema.parse({ id });

    const { toolCohortRole } = await updateToolCohortRole(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(toolCohortRole, { status: 200 });
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

    const validatedParams = toolCohortRoleIdSchema.parse({ id });
    const { toolCohortRole } = await deleteToolCohortRole(validatedParams.id);

    return NextResponse.json(toolCohortRole, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
