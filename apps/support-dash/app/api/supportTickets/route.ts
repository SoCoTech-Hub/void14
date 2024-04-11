import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createSupportTicket,
  deleteSupportTicket,
  updateSupportTicket,
} from "@/lib/api/supportTickets/mutations";
import { 
  supportTicketIdSchema,
  insertSupportTicketParams,
  updateSupportTicketParams 
} from "@/lib/db/schema/supportTickets";

export async function POST(req: Request) {
  try {
    const validatedData = insertSupportTicketParams.parse(await req.json());
    const { supportTicket } = await createSupportTicket(validatedData);

    revalidatePath("/supportTickets"); // optional - assumes you will have named route same as entity

    return NextResponse.json(supportTicket, { status: 201 });
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

    const validatedData = updateSupportTicketParams.parse(await req.json());
    const validatedParams = supportTicketIdSchema.parse({ id });

    const { supportTicket } = await updateSupportTicket(validatedParams.id, validatedData);

    return NextResponse.json(supportTicket, { status: 200 });
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

    const validatedParams = supportTicketIdSchema.parse({ id });
    const { supportTicket } = await deleteSupportTicket(validatedParams.id);

    return NextResponse.json(supportTicket, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
