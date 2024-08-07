import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createStatsUserMonthly,
  deleteStatsUserMonthly,
  updateStatsUserMonthly,
} from "@soco/stats-api/statsUserMonthlies/mutations";
import { 
  statsUserMonthlyIdSchema,
  insertStatsUserMonthlyParams,
  updateStatsUserMonthlyParams 
} from "@soco/stats-db/schema/statsUserMonthlies";

export async function POST(req: Request) {
  try {
    const validatedData = insertStatsUserMonthlyParams.parse(await req.json());
    const { statsUserMonthly } = await createStatsUserMonthly(validatedData);

    revalidatePath("/statsUserMonthlies"); // optional - assumes you will have named route same as entity

    return NextResponse.json(statsUserMonthly, { status: 201 });
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

    const validatedData = updateStatsUserMonthlyParams.parse(await req.json());
    const validatedParams = statsUserMonthlyIdSchema.parse({ id });

    const { statsUserMonthly } = await updateStatsUserMonthly(validatedParams.id, validatedData);

    return NextResponse.json(statsUserMonthly, { status: 200 });
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

    const validatedParams = statsUserMonthlyIdSchema.parse({ id });
    const { statsUserMonthly } = await deleteStatsUserMonthly(validatedParams.id);

    return NextResponse.json(statsUserMonthly, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
