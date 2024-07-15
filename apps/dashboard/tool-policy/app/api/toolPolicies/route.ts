import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createToolPolicy,
  deleteToolPolicy,
  updateToolPolicy,
} from "@soco/tool-policy-api/toolPolicies/mutations";
import { 
  toolPolicyIdSchema,
  insertToolPolicyParams,
  updateToolPolicyParams 
} from "@soco/tool-policy-db/schema/toolPolicies";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolPolicyParams.parse(await req.json());
    const { toolPolicy } = await createToolPolicy(validatedData);

    revalidatePath("/toolPolicies"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolPolicy, { status: 201 });
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

    const validatedData = updateToolPolicyParams.parse(await req.json());
    const validatedParams = toolPolicyIdSchema.parse({ id });

    const { toolPolicy } = await updateToolPolicy(validatedParams.id, validatedData);

    return NextResponse.json(toolPolicy, { status: 200 });
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

    const validatedParams = toolPolicyIdSchema.parse({ id });
    const { toolPolicy } = await deleteToolPolicy(validatedParams.id);

    return NextResponse.json(toolPolicy, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
