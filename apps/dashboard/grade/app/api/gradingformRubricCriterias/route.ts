import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGradingformRubricCriteria,
  deleteGradingformRubricCriteria,
  updateGradingformRubricCriteria,
} from "@soco/grade-api/gradingformRubricCriterias/mutations";
import { 
  gradingformRubricCriteriaIdSchema,
  insertGradingformRubricCriteriaParams,
  updateGradingformRubricCriteriaParams 
} from "@soco/grade-db/schema/gradingformRubricCriterias";

export async function POST(req: Request) {
  try {
    const validatedData = insertGradingformRubricCriteriaParams.parse(await req.json());
    const { gradingformRubricCriteria } = await createGradingformRubricCriteria(validatedData);

    revalidatePath("/gradingformRubricCriterias"); // optional - assumes you will have named route same as entity

    return NextResponse.json(gradingformRubricCriteria, { status: 201 });
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

    const validatedData = updateGradingformRubricCriteriaParams.parse(await req.json());
    const validatedParams = gradingformRubricCriteriaIdSchema.parse({ id });

    const { gradingformRubricCriteria } = await updateGradingformRubricCriteria(validatedParams.id, validatedData);

    return NextResponse.json(gradingformRubricCriteria, { status: 200 });
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

    const validatedParams = gradingformRubricCriteriaIdSchema.parse({ id });
    const { gradingformRubricCriteria } = await deleteGradingformRubricCriteria(validatedParams.id);

    return NextResponse.json(gradingformRubricCriteria, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
