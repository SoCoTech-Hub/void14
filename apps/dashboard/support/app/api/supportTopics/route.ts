import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createSupportTopic,
  deleteSupportTopic,
  updateSupportTopic,
} from "@soco/support-api/supportTopics/mutations";
import { 
  supportTopicIdSchema,
  insertSupportTopicParams,
  updateSupportTopicParams 
} from "@soco/support-db/schema/supportTopics";

export async function POST(req: Request) {
  try {
    const validatedData = insertSupportTopicParams.parse(await req.json());
    const { supportTopic } = await createSupportTopic(validatedData);

    revalidatePath("/supportTopics"); // optional - assumes you will have named route same as entity

    return NextResponse.json(supportTopic, { status: 201 });
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

    const validatedData = updateSupportTopicParams.parse(await req.json());
    const validatedParams = supportTopicIdSchema.parse({ id });

    const { supportTopic } = await updateSupportTopic(validatedParams.id, validatedData);

    return NextResponse.json(supportTopic, { status: 200 });
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

    const validatedParams = supportTopicIdSchema.parse({ id });
    const { supportTopic } = await deleteSupportTopic(validatedParams.id);

    return NextResponse.json(supportTopic, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
