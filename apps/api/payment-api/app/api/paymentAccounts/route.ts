import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createPaymentAccount,
  deletePaymentAccount,
  updatePaymentAccount,
} from "../../../lib/api/paymentAccounts/mutations";
import {
  insertPaymentAccountParams,
  paymentAccountIdSchema,
  updatePaymentAccountParams,
} from "../../../lib/db/schema/paymentAccounts";

export async function POST(req: Request) {
  try {
    const validatedData = insertPaymentAccountParams.parse(await req.json());
    const { paymentAccount } = await createPaymentAccount(validatedData);

    revalidatePath("/paymentAccounts"); // optional - assumes you will have named route same as entity

    return NextResponse.json(paymentAccount, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updatePaymentAccountParams.parse(await req.json());
    const validatedParams = paymentAccountIdSchema.parse({ id });

    const { paymentAccount } = await updatePaymentAccount(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(paymentAccount, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = paymentAccountIdSchema.parse({ id });
    const { paymentAccount } = await deletePaymentAccount(validatedParams.id);

    return NextResponse.json(paymentAccount, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
