import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createStatsWeekly,
  deleteStatsWeekly,
  updateStatsWeekly,
} from "@/lib/api/statsWeeklies/mutations";
import { 
  statsWeeklyIdSchema,
  insertStatsWeeklyParams,
  updateStatsWeeklyParams 
} from "@/lib/db/schema/statsWeeklies";

export async function POST(req: Request) {
  try {
    const validatedData = insertStatsWeeklyParams.parse(await req.json());
    const { statsWeekly } = await createStatsWeekly(validatedData);

    revalidatePath("/statsWeeklies"); // optional - assumes you will have named route same as entity

    return NextResponse.json(statsWeekly, { status: 201 });
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

    const validatedData = updateStatsWeeklyParams.parse(await req.json());
    const validatedParams = statsWeeklyIdSchema.parse({ id });

    const { statsWeekly } = await updateStatsWeekly(validatedParams.id, validatedData);

    return NextResponse.json(statsWeekly, { status: 200 });
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

    const validatedParams = statsWeeklyIdSchema.parse({ id });
    const { statsWeekly } = await deleteStatsWeekly(validatedParams.id);

    return NextResponse.json(statsWeekly, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
