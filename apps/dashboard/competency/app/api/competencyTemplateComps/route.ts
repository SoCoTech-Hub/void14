import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCompetencyTemplateComp,
  deleteCompetencyTemplateComp,
  updateCompetencyTemplateComp,
} from "@/lib/api/competencyTemplateComps/mutations";
import { 
  competencyTemplateCompIdSchema,
  insertCompetencyTemplateCompParams,
  updateCompetencyTemplateCompParams 
} from "@/lib/db/schema/competencyTemplateComps";

export async function POST(req: Request) {
  try {
    const validatedData = insertCompetencyTemplateCompParams.parse(await req.json());
    const { competencyTemplateComp } = await createCompetencyTemplateComp(validatedData);

    revalidatePath("/competencyTemplateComps"); // optional - assumes you will have named route same as entity

    return NextResponse.json(competencyTemplateComp, { status: 201 });
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

    const validatedData = updateCompetencyTemplateCompParams.parse(await req.json());
    const validatedParams = competencyTemplateCompIdSchema.parse({ id });

    const { competencyTemplateComp } = await updateCompetencyTemplateComp(validatedParams.id, validatedData);

    return NextResponse.json(competencyTemplateComp, { status: 200 });
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

    const validatedParams = competencyTemplateCompIdSchema.parse({ id });
    const { competencyTemplateComp } = await deleteCompetencyTemplateComp(validatedParams.id);

    return NextResponse.json(competencyTemplateComp, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
