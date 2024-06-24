import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCompetencyPlan,
  deleteCompetencyPlan,
  updateCompetencyPlan,
} from "@/lib/api/competencyPlans/mutations";
import { 
  competencyPlanIdSchema,
  insertCompetencyPlanParams,
  updateCompetencyPlanParams 
} from "@/lib/db/schema/competencyPlans";

export async function POST(req: Request) {
  try {
    const validatedData = insertCompetencyPlanParams.parse(await req.json());
    const { competencyPlan } = await createCompetencyPlan(validatedData);

    revalidatePath("/competencyPlans"); // optional - assumes you will have named route same as entity

    return NextResponse.json(competencyPlan, { status: 201 });
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

    const validatedData = updateCompetencyPlanParams.parse(await req.json());
    const validatedParams = competencyPlanIdSchema.parse({ id });

    const { competencyPlan } = await updateCompetencyPlan(validatedParams.id, validatedData);

    return NextResponse.json(competencyPlan, { status: 200 });
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

    const validatedParams = competencyPlanIdSchema.parse({ id });
    const { competencyPlan } = await deleteCompetencyPlan(validatedParams.id);

    return NextResponse.json(competencyPlan, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
