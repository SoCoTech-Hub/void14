import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createToolPolicyVersion,
  deleteToolPolicyVersion,
  updateToolPolicyVersion,
} from "@/lib/api/toolPolicyVersions/mutations";
import { 
  toolPolicyVersionIdSchema,
  insertToolPolicyVersionParams,
  updateToolPolicyVersionParams 
} from "@/lib/db/schema/toolPolicyVersions";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolPolicyVersionParams.parse(await req.json());
    const { toolPolicyVersion } = await createToolPolicyVersion(validatedData);

    revalidatePath("/toolPolicyVersions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolPolicyVersion, { status: 201 });
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

    const validatedData = updateToolPolicyVersionParams.parse(await req.json());
    const validatedParams = toolPolicyVersionIdSchema.parse({ id });

    const { toolPolicyVersion } = await updateToolPolicyVersion(validatedParams.id, validatedData);

    return NextResponse.json(toolPolicyVersion, { status: 200 });
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

    const validatedParams = toolPolicyVersionIdSchema.parse({ id });
    const { toolPolicyVersion } = await deleteToolPolicyVersion(validatedParams.id);

    return NextResponse.json(toolPolicyVersion, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
