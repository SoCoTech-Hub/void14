import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCohort,
  deleteCohort,
  updateCohort,
} from "@soco/cohort-api/cohorts/mutations";
import { 
  cohortIdSchema,
  insertCohortParams,
  updateCohortParams 
} from "@soco/cohort-db/schema/cohorts";

export async function POST(req: Request) {
  try {
    const validatedData = insertCohortParams.parse(await req.json());
    const { cohort } = await createCohort(validatedData);

    revalidatePath("/cohorts"); // optional - assumes you will have named route same as entity

    return NextResponse.json(cohort, { status: 201 });
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

    const validatedData = updateCohortParams.parse(await req.json());
    const validatedParams = cohortIdSchema.parse({ id });

    const { cohort } = await updateCohort(validatedParams.id, validatedData);

    return NextResponse.json(cohort, { status: 200 });
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

    const validatedParams = cohortIdSchema.parse({ id });
    const { cohort } = await deleteCohort(validatedParams.id);

    return NextResponse.json(cohort, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
