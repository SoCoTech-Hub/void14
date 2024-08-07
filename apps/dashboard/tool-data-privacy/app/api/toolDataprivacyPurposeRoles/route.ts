import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createToolDataprivacyPurposeRole,
  deleteToolDataprivacyPurposeRole,
  updateToolDataprivacyPurposeRole,
} from "@soco/tool-data-privacy-api/toolDataprivacyPurposeRoles/mutations";
import { 
  toolDataprivacyPurposeRoleIdSchema,
  insertToolDataprivacyPurposeRoleParams,
  updateToolDataprivacyPurposeRoleParams 
} from "@soco/tool-data-privacy-db/schema/toolDataprivacyPurposeRoles";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolDataprivacyPurposeRoleParams.parse(await req.json());
    const { toolDataprivacyPurposeRole } = await createToolDataprivacyPurposeRole(validatedData);

    revalidatePath("/toolDataprivacyPurposeRoles"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolDataprivacyPurposeRole, { status: 201 });
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

    const validatedData = updateToolDataprivacyPurposeRoleParams.parse(await req.json());
    const validatedParams = toolDataprivacyPurposeRoleIdSchema.parse({ id });

    const { toolDataprivacyPurposeRole } = await updateToolDataprivacyPurposeRole(validatedParams.id, validatedData);

    return NextResponse.json(toolDataprivacyPurposeRole, { status: 200 });
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

    const validatedParams = toolDataprivacyPurposeRoleIdSchema.parse({ id });
    const { toolDataprivacyPurposeRole } = await deleteToolDataprivacyPurposeRole(validatedParams.id);

    return NextResponse.json(toolDataprivacyPurposeRole, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
