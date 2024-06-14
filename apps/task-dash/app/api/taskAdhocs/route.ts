import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createTaskAdhoc,
  deleteTaskAdhoc,
  updateTaskAdhoc,
} from "@/lib/api/taskAdhocs/mutations";
import { 
  taskAdhocIdSchema,
  insertTaskAdhocParams,
  updateTaskAdhocParams 
} from "@/lib/db/schema/taskAdhocs";

export async function POST(req: Request) {
  try {
    const validatedData = insertTaskAdhocParams.parse(await req.json());
    const { taskAdhoc } = await createTaskAdhoc(validatedData);

    revalidatePath("/taskAdhocs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(taskAdhoc, { status: 201 });
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

    const validatedData = updateTaskAdhocParams.parse(await req.json());
    const validatedParams = taskAdhocIdSchema.parse({ id });

    const { taskAdhoc } = await updateTaskAdhoc(validatedParams.id, validatedData);

    return NextResponse.json(taskAdhoc, { status: 200 });
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

    const validatedParams = taskAdhocIdSchema.parse({ id });
    const { taskAdhoc } = await deleteTaskAdhoc(validatedParams.id);

    return NextResponse.json(taskAdhoc, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
