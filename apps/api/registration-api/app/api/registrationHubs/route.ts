import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  createRegistrationHub,
  deleteRegistrationHub,
  updateRegistrationHub,
} from "../../../lib/api/registrationHubs/mutations";
import {
  insertRegistrationHubParams,
  registrationHubIdSchema,
  updateRegistrationHubParams,
} from "../../../lib/db/schema/registrationHubs";

export async function POST(req: Request) {
  try {
    const validatedData = insertRegistrationHubParams.parse(await req.json());
    const { registrationHub } = await createRegistrationHub(validatedData);

    revalidatePath("/registrationHubs"); // optional - assumes you will have named route same as entity

    return NextResponse.json(registrationHub, { status: 201 });
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

    const validatedData = updateRegistrationHubParams.parse(await req.json());
    const validatedParams = registrationHubIdSchema.parse({ id });

    const { registrationHub } = await updateRegistrationHub(
      validatedParams.id,
      validatedData,
    );

    return NextResponse.json(registrationHub, { status: 200 });
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

    const validatedParams = registrationHubIdSchema.parse({ id });
    const { registrationHub } = await deleteRegistrationHub(validatedParams.id);

    return NextResponse.json(registrationHub, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
