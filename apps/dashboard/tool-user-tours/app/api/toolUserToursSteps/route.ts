import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createToolUserToursStep,
  deleteToolUserToursStep,
  updateToolUserToursStep,
} from "@soco/tool-user-tours-api/toolUserToursSteps/mutations";
import { 
  toolUserToursStepIdSchema,
  insertToolUserToursStepParams,
  updateToolUserToursStepParams 
} from "@soco/tool-user-tours-db/schema/toolUserToursSteps";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolUserToursStepParams.parse(await req.json());
    const { toolUserToursStep } = await createToolUserToursStep(validatedData);

    revalidatePath("/toolUserToursSteps"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolUserToursStep, { status: 201 });
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

    const validatedData = updateToolUserToursStepParams.parse(await req.json());
    const validatedParams = toolUserToursStepIdSchema.parse({ id });

    const { toolUserToursStep } = await updateToolUserToursStep(validatedParams.id, validatedData);

    return NextResponse.json(toolUserToursStep, { status: 200 });
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

    const validatedParams = toolUserToursStepIdSchema.parse({ id });
    const { toolUserToursStep } = await deleteToolUserToursStep(validatedParams.id);

    return NextResponse.json(toolUserToursStep, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
