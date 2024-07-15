import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGroupsMember,
  deleteGroupsMember,
  updateGroupsMember,
} from "@soco/group-api/groupsMembers/mutations";
import { 
  groupsMemberIdSchema,
  insertGroupsMemberParams,
  updateGroupsMemberParams 
} from "@soco/group-db/schema/groupsMembers";

export async function POST(req: Request) {
  try {
    const validatedData = insertGroupsMemberParams.parse(await req.json());
    const { groupsMember } = await createGroupsMember(validatedData);

    revalidatePath("/groupsMembers"); // optional - assumes you will have named route same as entity

    return NextResponse.json(groupsMember, { status: 201 });
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

    const validatedData = updateGroupsMemberParams.parse(await req.json());
    const validatedParams = groupsMemberIdSchema.parse({ id });

    const { groupsMember } = await updateGroupsMember(validatedParams.id, validatedData);

    return NextResponse.json(groupsMember, { status: 200 });
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

    const validatedParams = groupsMemberIdSchema.parse({ id });
    const { groupsMember } = await deleteGroupsMember(validatedParams.id);

    return NextResponse.json(groupsMember, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
