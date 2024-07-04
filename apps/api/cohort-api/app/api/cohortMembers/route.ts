import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createCohortMember,
  deleteCohortMember,
  updateCohortMember,
} from "../../../lib/api/cohortMembers/mutations";
import {
  cohortMemberIdSchema,
  insertCohortMemberParams,
  updateCohortMemberParams,
} from "../../../lib/db/schema/cohortMembers";

export async function POST(req: Request) {
  try {
    const validatedData = insertCohortMemberParams.parse(await req.json());
    const { cohortMember } = await createCohortMember(validatedData);

    revalidatePath("/cohortMembers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(cohortMember, { status: 201 });
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

    const validatedData = updateCohortMemberParams.parse(await req.json());
    const validatedParams = cohortMemberIdSchema.parse({ id });

    const { cohortMember } = await updateCohortMember(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(cohortMember, { status: 200 });
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

    const validatedParams = cohortMemberIdSchema.parse({ id });
    const { cohortMember } = await deleteCohortMember(validatedParams.id);

    return NextResponse.json(cohortMember, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
