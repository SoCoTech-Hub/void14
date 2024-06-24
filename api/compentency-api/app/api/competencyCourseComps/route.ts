import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCompetencyCourseComp,
  deleteCompetencyCourseComp,
  updateCompetencyCourseComp,
} from "@/lib/api/competencyCourseComps/mutations";
import { 
  competencyCourseCompIdSchema,
  insertCompetencyCourseCompParams,
  updateCompetencyCourseCompParams 
} from "@/lib/db/schema/competencyCourseComps";

export async function POST(req: Request) {
  try {
    const validatedData = insertCompetencyCourseCompParams.parse(await req.json());
    const { competencyCourseComp } = await createCompetencyCourseComp(validatedData);

    revalidatePath("/competencyCourseComps"); // optional - assumes you will have named route same as entity

    return NextResponse.json(competencyCourseComp, { status: 201 });
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

    const validatedData = updateCompetencyCourseCompParams.parse(await req.json());
    const validatedParams = competencyCourseCompIdSchema.parse({ id });

    const { competencyCourseComp } = await updateCompetencyCourseComp(validatedParams.id, validatedData);

    return NextResponse.json(competencyCourseComp, { status: 200 });
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

    const validatedParams = competencyCourseCompIdSchema.parse({ id });
    const { competencyCourseComp } = await deleteCompetencyCourseComp(validatedParams.id);

    return NextResponse.json(competencyCourseComp, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
