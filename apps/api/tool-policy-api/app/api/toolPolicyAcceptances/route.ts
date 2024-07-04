import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createToolPolicyAcceptance,
  deleteToolPolicyAcceptance,
  updateToolPolicyAcceptance,
} from "../../../lib/api/toolPolicyAcceptances/mutations";
import {
  insertToolPolicyAcceptanceParams,
  toolPolicyAcceptanceIdSchema,
  updateToolPolicyAcceptanceParams,
} from "../../../lib/db/schema/toolPolicyAcceptances";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolPolicyAcceptanceParams.parse(
      await req.json(),
    );
    const { toolPolicyAcceptance } =
      await createToolPolicyAcceptance(validatedData);

    revalidatePath("/toolPolicyAcceptances"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolPolicyAcceptance, { status: 201 });
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

    const validatedData = updateToolPolicyAcceptanceParams.parse(
      await req.json(),
    );
    const validatedParams = toolPolicyAcceptanceIdSchema.parse({ id });

    const { toolPolicyAcceptance } = await updateToolPolicyAcceptance(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(toolPolicyAcceptance, { status: 200 });
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

    const validatedParams = toolPolicyAcceptanceIdSchema.parse({ id });
    const { toolPolicyAcceptance } = await deleteToolPolicyAcceptance(
      validatedParams.id,
    );

    return NextResponse.json(toolPolicyAcceptance, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
