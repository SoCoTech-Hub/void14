import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createMassMailListsRecipient,
  deleteMassMailListsRecipient,
  updateMassMailListsRecipient,
} from "@soco/mass-mail-api/massMailListsRecipients/mutations";
import { 
  massMailListsRecipientIdSchema,
  insertMassMailListsRecipientParams,
  updateMassMailListsRecipientParams 
} from "@soco/mass-mail-db/schema/massMailListsRecipients";

export async function POST(req: Request) {
  try {
    const validatedData = insertMassMailListsRecipientParams.parse(await req.json());
    const { massMailListsRecipient } = await createMassMailListsRecipient(validatedData);

    revalidatePath("/massMailListsRecipients"); // optional - assumes you will have named route same as entity

    return NextResponse.json(massMailListsRecipient, { status: 201 });
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

    const validatedData = updateMassMailListsRecipientParams.parse(await req.json());
    const validatedParams = massMailListsRecipientIdSchema.parse({ id });

    const { massMailListsRecipient } = await updateMassMailListsRecipient(validatedParams.id, validatedData);

    return NextResponse.json(massMailListsRecipient, { status: 200 });
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

    const validatedParams = massMailListsRecipientIdSchema.parse({ id });
    const { massMailListsRecipient } = await deleteMassMailListsRecipient(validatedParams.id);

    return NextResponse.json(massMailListsRecipient, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
