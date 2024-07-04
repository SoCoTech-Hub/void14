import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createCompetencyUserEvidence,
  deleteCompetencyUserEvidence,
  updateCompetencyUserEvidence,
} from "../../../lib/api/competencyUserEvidences/mutations";
import {
  competencyUserEvidenceIdSchema,
  insertCompetencyUserEvidenceParams,
  updateCompetencyUserEvidenceParams,
} from "../../../lib/db/schema/competencyUserEvidences";

export async function POST(req: Request) {
  try {
    const validatedData = insertCompetencyUserEvidenceParams.parse(
      await req.json(),
    );
    const { competencyUserEvidence } =
      await createCompetencyUserEvidence(validatedData);

    revalidatePath("/competencyUserEvidences"); // optional - assumes you will have named route same as entity

    return NextResponse.json(competencyUserEvidence, { status: 201 });
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

    const validatedData = updateCompetencyUserEvidenceParams.parse(
      await req.json(),
    );
    const validatedParams = competencyUserEvidenceIdSchema.parse({ id });

    const { competencyUserEvidence } = await updateCompetencyUserEvidence(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(competencyUserEvidence, { status: 200 });
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

    const validatedParams = competencyUserEvidenceIdSchema.parse({ id });
    const { competencyUserEvidence } = await deleteCompetencyUserEvidence(
      validatedParams.id,
    );

    return NextResponse.json(competencyUserEvidence, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
