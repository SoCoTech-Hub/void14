import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createGroupingsGroup,
  deleteGroupingsGroup,
  updateGroupingsGroup,
} from "../../../lib/api/groupingsGroups/mutations";
import {
  groupingsGroupIdSchema,
  insertGroupingsGroupParams,
  updateGroupingsGroupParams,
} from "../../../lib/db/schema/groupingsGroups";

export async function POST(req: Request) {
  try {
    const validatedData = insertGroupingsGroupParams.parse(await req.json());
    const { groupingsGroup } = await createGroupingsGroup(validatedData);

    revalidatePath("/groupingsGroups"); // optional - assumes you will have named route same as entity

    return NextResponse.json(groupingsGroup, { status: 201 });
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

    const validatedData = updateGroupingsGroupParams.parse(await req.json());
    const validatedParams = groupingsGroupIdSchema.parse({ id });

    const { groupingsGroup } = await updateGroupingsGroup(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(groupingsGroup, { status: 200 });
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

    const validatedParams = groupingsGroupIdSchema.parse({ id });
    const { groupingsGroup } = await deleteGroupingsGroup(validatedParams.id);

    return NextResponse.json(groupingsGroup, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
