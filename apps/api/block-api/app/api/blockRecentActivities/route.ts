import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createBlockRecentActivity,
  deleteBlockRecentActivity,
  updateBlockRecentActivity,
} from "../../../lib/api/blockRecentActivities/mutations";
import {
  blockRecentActivityIdSchema,
  insertBlockRecentActivityParams,
  updateBlockRecentActivityParams,
} from "../../../lib/db/schema/blockRecentActivities";

export async function POST(req: Request) {
  try {
    const validatedData = insertBlockRecentActivityParams.parse(
      await req.json(),
    );
    const { blockRecentActivity } =
      await createBlockRecentActivity(validatedData);

    revalidatePath("/blockRecentActivities"); // optional - assumes you will have named route same as entity

    return NextResponse.json(blockRecentActivity, { status: 201 });
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

    const validatedData = updateBlockRecentActivityParams.parse(
      await req.json(),
    );
    const validatedParams = blockRecentActivityIdSchema.parse({ id });

    const { blockRecentActivity } = await updateBlockRecentActivity(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(blockRecentActivity, { status: 200 });
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

    const validatedParams = blockRecentActivityIdSchema.parse({ id });
    const { blockRecentActivity } = await deleteBlockRecentActivity(
      validatedParams.id,
    );

    return NextResponse.json(blockRecentActivity, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
