import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGradingDefinition,
  deleteGradingDefinition,
  updateGradingDefinition,
} from "@soco/grade-api/gradingDefinitions/mutations";
import { 
  gradingDefinitionIdSchema,
  insertGradingDefinitionParams,
  updateGradingDefinitionParams 
} from "@soco/grade-db/schema/gradingDefinitions";

export async function POST(req: Request) {
  try {
    const validatedData = insertGradingDefinitionParams.parse(await req.json());
    const { gradingDefinition } = await createGradingDefinition(validatedData);

    revalidatePath("/gradingDefinitions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(gradingDefinition, { status: 201 });
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

    const validatedData = updateGradingDefinitionParams.parse(await req.json());
    const validatedParams = gradingDefinitionIdSchema.parse({ id });

    const { gradingDefinition } = await updateGradingDefinition(validatedParams.id, validatedData);

    return NextResponse.json(gradingDefinition, { status: 200 });
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

    const validatedParams = gradingDefinitionIdSchema.parse({ id });
    const { gradingDefinition } = await deleteGradingDefinition(validatedParams.id);

    return NextResponse.json(gradingDefinition, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
