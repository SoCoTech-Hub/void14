import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCompetency,
  deleteCompetency,
  updateCompetency,
} from "@soco/competency-api/competencies/mutations";
import { 
  competencyIdSchema,
  insertCompetencyParams,
  updateCompetencyParams 
} from "@soco/competency-db/schema/competencies";

export async function POST(req: Request) {
  try {
    const validatedData = insertCompetencyParams.parse(await req.json());
    const { competency } = await createCompetency(validatedData);

    revalidatePath("/competencies"); // optional - assumes you will have named route same as entity

    return NextResponse.json(competency, { status: 201 });
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

    const validatedData = updateCompetencyParams.parse(await req.json());
    const validatedParams = competencyIdSchema.parse({ id });

    const { competency } = await updateCompetency(validatedParams.id, validatedData);

    return NextResponse.json(competency, { status: 200 });
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

    const validatedParams = competencyIdSchema.parse({ id });
    const { competency } = await deleteCompetency(validatedParams.id);

    return NextResponse.json(competency, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
