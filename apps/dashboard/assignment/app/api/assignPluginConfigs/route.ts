import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAssignPluginConfig,
  deleteAssignPluginConfig,
  updateAssignPluginConfig,
} from "@soco/assignment-api/assignPluginConfigs/mutations";
import { 
  assignPluginConfigIdSchema,
  insertAssignPluginConfigParams,
  updateAssignPluginConfigParams 
} from "@soco/assignment-db/schema/assignPluginConfigs";

export async function POST(req: Request) {
  try {
    const validatedData = insertAssignPluginConfigParams.parse(await req.json());
    const { assignPluginConfig } = await createAssignPluginConfig(validatedData);

    revalidatePath("/assignPluginConfigs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(assignPluginConfig, { status: 201 });
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

    const validatedData = updateAssignPluginConfigParams.parse(await req.json());
    const validatedParams = assignPluginConfigIdSchema.parse({ id });

    const { assignPluginConfig } = await updateAssignPluginConfig(validatedParams.id, validatedData);

    return NextResponse.json(assignPluginConfig, { status: 200 });
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

    const validatedParams = assignPluginConfigIdSchema.parse({ id });
    const { assignPluginConfig } = await deleteAssignPluginConfig(validatedParams.id);

    return NextResponse.json(assignPluginConfig, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
