import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createStatsUserWeekly,
  deleteStatsUserWeekly,
  updateStatsUserWeekly,
} from "@soco/stats-api/statsUserWeeklies/mutations";
import { 
  statsUserWeeklyIdSchema,
  insertStatsUserWeeklyParams,
  updateStatsUserWeeklyParams 
} from "@soco/stats-db/schema/statsUserWeeklies";

export async function POST(req: Request) {
  try {
    const validatedData = insertStatsUserWeeklyParams.parse(await req.json());
    const { statsUserWeekly } = await createStatsUserWeekly(validatedData);

    revalidatePath("/statsUserWeeklies"); // optional - assumes you will have named route same as entity

    return NextResponse.json(statsUserWeekly, { status: 201 });
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

    const validatedData = updateStatsUserWeeklyParams.parse(await req.json());
    const validatedParams = statsUserWeeklyIdSchema.parse({ id });

    const { statsUserWeekly } = await updateStatsUserWeekly(validatedParams.id, validatedData);

    return NextResponse.json(statsUserWeekly, { status: 200 });
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

    const validatedParams = statsUserWeeklyIdSchema.parse({ id });
    const { statsUserWeekly } = await deleteStatsUserWeekly(validatedParams.id);

    return NextResponse.json(statsUserWeekly, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
