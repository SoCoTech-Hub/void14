import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAffiliatesTransaction,
  deleteAffiliatesTransaction,
  updateAffiliatesTransaction,
} from "@/lib/api/affiliatesTransactions/mutations";
import { 
  affiliatesTransactionIdSchema,
  insertAffiliatesTransactionParams,
  updateAffiliatesTransactionParams 
} from "@/lib/db/schema/affiliatesTransactions";

export async function POST(req: Request) {
  try {
    const validatedData = insertAffiliatesTransactionParams.parse(await req.json());
    const { affiliatesTransaction } = await createAffiliatesTransaction(validatedData);

    revalidatePath("/affiliatesTransactions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(affiliatesTransaction, { status: 201 });
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

    const validatedData = updateAffiliatesTransactionParams.parse(await req.json());
    const validatedParams = affiliatesTransactionIdSchema.parse({ id });

    const { affiliatesTransaction } = await updateAffiliatesTransaction(validatedParams.id, validatedData);

    return NextResponse.json(affiliatesTransaction, { status: 200 });
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

    const validatedParams = affiliatesTransactionIdSchema.parse({ id });
    const { affiliatesTransaction } = await deleteAffiliatesTransaction(validatedParams.id);

    return NextResponse.json(affiliatesTransaction, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
