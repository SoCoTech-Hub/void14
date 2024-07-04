import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createCompetencyTemplate,
  deleteCompetencyTemplate,
  updateCompetencyTemplate,
} from "../../../lib/api/competencyTemplates/mutations";
import {
  competencyTemplateIdSchema,
  insertCompetencyTemplateParams,
  updateCompetencyTemplateParams,
} from "../../../lib/db/schema/competencyTemplates";

export async function POST(req: Request) {
  try {
    const validatedData = insertCompetencyTemplateParams.parse(
      await req.json(),
    );
    const { competencyTemplate } =
      await createCompetencyTemplate(validatedData);

    revalidatePath("/competencyTemplates"); // optional - assumes you will have named route same as entity

    return NextResponse.json(competencyTemplate, { status: 201 });
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

    const validatedData = updateCompetencyTemplateParams.parse(
      await req.json(),
    );
    const validatedParams = competencyTemplateIdSchema.parse({ id });

    const { competencyTemplate } = await updateCompetencyTemplate(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(competencyTemplate, { status: 200 });
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

    const validatedParams = competencyTemplateIdSchema.parse({ id });
    const { competencyTemplate } = await deleteCompetencyTemplate(
      validatedParams.id,
    );

    return NextResponse.json(competencyTemplate, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
