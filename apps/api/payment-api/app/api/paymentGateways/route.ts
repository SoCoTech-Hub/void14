import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createPaymentGateway,
  deletePaymentGateway,
  updatePaymentGateway,
} from "../../../lib/api/paymentGateways/mutations";
import {
  insertPaymentGatewayParams,
  paymentGatewayIdSchema,
  updatePaymentGatewayParams,
} from "../../../lib/db/schema/paymentGateways";

export async function POST(req: Request) {
  try {
    const validatedData = insertPaymentGatewayParams.parse(await req.json());
    const { paymentGateway } = await createPaymentGateway(validatedData);

    revalidatePath("/paymentGateways"); // optional - assumes you will have named route same as entity

    return NextResponse.json(paymentGateway, { status: 201 });
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

    const validatedData = updatePaymentGatewayParams.parse(await req.json());
    const validatedParams = paymentGatewayIdSchema.parse({ id });

    const { paymentGateway } = await updatePaymentGateway(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(paymentGateway, { status: 200 });
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

    const validatedParams = paymentGatewayIdSchema.parse({ id });
    const { paymentGateway } = await deletePaymentGateway(validatedParams.id);

    return NextResponse.json(paymentGateway, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
