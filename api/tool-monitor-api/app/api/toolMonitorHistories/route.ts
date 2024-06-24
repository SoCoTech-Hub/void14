import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createToolMonitorHistory,
  deleteToolMonitorHistory,
  updateToolMonitorHistory,
} from "@/lib/api/toolMonitorHistories/mutations";
import { 
  toolMonitorHistoryIdSchema,
  insertToolMonitorHistoryParams,
  updateToolMonitorHistoryParams 
} from "@/lib/db/schema/toolMonitorHistories";

export async function POST(req: Request) {
  try {
    const validatedData = insertToolMonitorHistoryParams.parse(await req.json());
    const { toolMonitorHistory } = await createToolMonitorHistory(validatedData);

    revalidatePath("/toolMonitorHistories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(toolMonitorHistory, { status: 201 });
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

    const validatedData = updateToolMonitorHistoryParams.parse(await req.json());
    const validatedParams = toolMonitorHistoryIdSchema.parse({ id });

    const { toolMonitorHistory } = await updateToolMonitorHistory(validatedParams.id, validatedData);

    return NextResponse.json(toolMonitorHistory, { status: 200 });
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

    const validatedParams = toolMonitorHistoryIdSchema.parse({ id });
    const { toolMonitorHistory } = await deleteToolMonitorHistory(validatedParams.id);

    return NextResponse.json(toolMonitorHistory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
