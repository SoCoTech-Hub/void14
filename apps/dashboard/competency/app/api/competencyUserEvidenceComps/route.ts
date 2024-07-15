import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCompetencyUserEvidenceComp,
  deleteCompetencyUserEvidenceComp,
  updateCompetencyUserEvidenceComp,
} from "@soco/competency-api/competencyUserEvidenceComps/mutations";
import { 
  competencyUserEvidenceCompIdSchema,
  insertCompetencyUserEvidenceCompParams,
  updateCompetencyUserEvidenceCompParams 
} from "@soco/competency-db/schema/competencyUserEvidenceComps";

export async function POST(req: Request) {
  try {
    const validatedData = insertCompetencyUserEvidenceCompParams.parse(await req.json());
    const { competencyUserEvidenceComp } = await createCompetencyUserEvidenceComp(validatedData);

    revalidatePath("/competencyUserEvidenceComps"); // optional - assumes you will have named route same as entity

    return NextResponse.json(competencyUserEvidenceComp, { status: 201 });
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

    const validatedData = updateCompetencyUserEvidenceCompParams.parse(await req.json());
    const validatedParams = competencyUserEvidenceCompIdSchema.parse({ id });

    const { competencyUserEvidenceComp } = await updateCompetencyUserEvidenceComp(validatedParams.id, validatedData);

    return NextResponse.json(competencyUserEvidenceComp, { status: 200 });
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

    const validatedParams = competencyUserEvidenceCompIdSchema.parse({ id });
    const { competencyUserEvidenceComp } = await deleteCompetencyUserEvidenceComp(validatedParams.id);

    return NextResponse.json(competencyUserEvidenceComp, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
