import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGradingInstance,
  deleteGradingInstance,
  updateGradingInstance,
} from "@/lib/api/gradingInstances/mutations";
import { 
  gradingInstanceIdSchema,
  insertGradingInstanceParams,
  updateGradingInstanceParams 
} from "@/lib/db/schema/gradingInstances";

export async function POST(req: Request) {
  try {
    const validatedData = insertGradingInstanceParams.parse(await req.json());
    const { gradingInstance } = await createGradingInstance(validatedData);

    revalidatePath("/gradingInstances"); // optional - assumes you will have named route same as entity

    return NextResponse.json(gradingInstance, { status: 201 });
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

    const validatedData = updateGradingInstanceParams.parse(await req.json());
    const validatedParams = gradingInstanceIdSchema.parse({ id });

    const { gradingInstance } = await updateGradingInstance(validatedParams.id, validatedData);

    return NextResponse.json(gradingInstance, { status: 200 });
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

    const validatedParams = gradingInstanceIdSchema.parse({ id });
    const { gradingInstance } = await deleteGradingInstance(validatedParams.id);

    return NextResponse.json(gradingInstance, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
