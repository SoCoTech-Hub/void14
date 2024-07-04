import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createScormSeqObjective,
  deleteScormSeqObjective,
  updateScormSeqObjective,
} from "../../../lib/api/scormSeqObjectives/mutations";
import {
  insertScormSeqObjectiveParams,
  scormSeqObjectiveIdSchema,
  updateScormSeqObjectiveParams,
} from "../../../lib/db/schema/scormSeqObjectives";

export async function POST(req: Request) {
  try {
    const validatedData = insertScormSeqObjectiveParams.parse(await req.json());
    const { scormSeqObjective } = await createScormSeqObjective(validatedData);

    revalidatePath("/scormSeqObjectives"); // optional - assumes you will have named route same as entity

    return NextResponse.json(scormSeqObjective, { status: 201 });
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

    const validatedData = updateScormSeqObjectiveParams.parse(await req.json());
    const validatedParams = scormSeqObjectiveIdSchema.parse({ id });

    const { scormSeqObjective } = await updateScormSeqObjective(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(scormSeqObjective, { status: 200 });
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

    const validatedParams = scormSeqObjectiveIdSchema.parse({ id });
    const { scormSeqObjective } = await deleteScormSeqObjective(
      validatedParams.id,
    );

    return NextResponse.json(scormSeqObjective, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
