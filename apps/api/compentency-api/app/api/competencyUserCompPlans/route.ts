import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createCompetencyUserCompPlan,
  deleteCompetencyUserCompPlan,
  updateCompetencyUserCompPlan,
} from "../../../lib/api/competencyUserCompPlans/mutations";
import {
  competencyUserCompPlanIdSchema,
  insertCompetencyUserCompPlanParams,
  updateCompetencyUserCompPlanParams,
} from "../../../lib/db/schema/competencyUserCompPlans";

export async function POST(req: Request) {
  try {
    const validatedData = insertCompetencyUserCompPlanParams.parse(
      await req.json(),
    );
    const { competencyUserCompPlan } =
      await createCompetencyUserCompPlan(validatedData);

    revalidatePath("/competencyUserCompPlans"); // optional - assumes you will have named route same as entity

    return NextResponse.json(competencyUserCompPlan, { status: 201 });
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

    const validatedData = updateCompetencyUserCompPlanParams.parse(
      await req.json(),
    );
    const validatedParams = competencyUserCompPlanIdSchema.parse({ id });

    const { competencyUserCompPlan } = await updateCompetencyUserCompPlan(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(competencyUserCompPlan, { status: 200 });
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

    const validatedParams = competencyUserCompPlanIdSchema.parse({ id });
    const { competencyUserCompPlan } = await deleteCompetencyUserCompPlan(
      validatedParams.id,
    );

    return NextResponse.json(competencyUserCompPlan, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
