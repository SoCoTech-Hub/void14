import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGradingformRubricLevel,
  deleteGradingformRubricLevel,
  updateGradingformRubricLevel,
} from "@soco/grade-api/gradingformRubricLevels/mutations";
import { 
  gradingformRubricLevelIdSchema,
  insertGradingformRubricLevelParams,
  updateGradingformRubricLevelParams 
} from "@soco/grade-db/schema/gradingformRubricLevels";

export async function POST(req: Request) {
  try {
    const validatedData = insertGradingformRubricLevelParams.parse(await req.json());
    const { gradingformRubricLevel } = await createGradingformRubricLevel(validatedData);

    revalidatePath("/gradingformRubricLevels"); // optional - assumes you will have named route same as entity

    return NextResponse.json(gradingformRubricLevel, { status: 201 });
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

    const validatedData = updateGradingformRubricLevelParams.parse(await req.json());
    const validatedParams = gradingformRubricLevelIdSchema.parse({ id });

    const { gradingformRubricLevel } = await updateGradingformRubricLevel(validatedParams.id, validatedData);

    return NextResponse.json(gradingformRubricLevel, { status: 200 });
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

    const validatedParams = gradingformRubricLevelIdSchema.parse({ id });
    const { gradingformRubricLevel } = await deleteGradingformRubricLevel(validatedParams.id);

    return NextResponse.json(gradingformRubricLevel, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
