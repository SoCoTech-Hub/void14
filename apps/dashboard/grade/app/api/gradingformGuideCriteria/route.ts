import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGradingformGuideCriterion,
  deleteGradingformGuideCriterion,
  updateGradingformGuideCriterion,
} from "@soco/grade-api/gradingformGuideCriteria/mutations";
import { 
  gradingformGuideCriterionIdSchema,
  insertGradingformGuideCriterionParams,
  updateGradingformGuideCriterionParams 
} from "@soco/grade-db/schema/gradingformGuideCriteria";

export async function POST(req: Request) {
  try {
    const validatedData = insertGradingformGuideCriterionParams.parse(await req.json());
    const { gradingformGuideCriterion } = await createGradingformGuideCriterion(validatedData);

    revalidatePath("/gradingformGuideCriteria"); // optional - assumes you will have named route same as entity

    return NextResponse.json(gradingformGuideCriterion, { status: 201 });
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

    const validatedData = updateGradingformGuideCriterionParams.parse(await req.json());
    const validatedParams = gradingformGuideCriterionIdSchema.parse({ id });

    const { gradingformGuideCriterion } = await updateGradingformGuideCriterion(validatedParams.id, validatedData);

    return NextResponse.json(gradingformGuideCriterion, { status: 200 });
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

    const validatedParams = gradingformGuideCriterionIdSchema.parse({ id });
    const { gradingformGuideCriterion } = await deleteGradingformGuideCriterion(validatedParams.id);

    return NextResponse.json(gradingformGuideCriterion, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
