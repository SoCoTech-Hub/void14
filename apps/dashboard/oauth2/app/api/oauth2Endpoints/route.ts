import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createOauth2Endpoint,
  deleteOauth2Endpoint,
  updateOauth2Endpoint,
} from "@soco/oauth2-api/oauth2Endpoints/mutations";
import { 
  oauth2EndpointIdSchema,
  insertOauth2EndpointParams,
  updateOauth2EndpointParams 
} from "@soco/oauth2-db/schema/oauth2Endpoints";

export async function POST(req: Request) {
  try {
    const validatedData = insertOauth2EndpointParams.parse(await req.json());
    const { oauth2Endpoint } = await createOauth2Endpoint(validatedData);

    revalidatePath("/oauth2Endpoints"); // optional - assumes you will have named route same as entity

    return NextResponse.json(oauth2Endpoint, { status: 201 });
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

    const validatedData = updateOauth2EndpointParams.parse(await req.json());
    const validatedParams = oauth2EndpointIdSchema.parse({ id });

    const { oauth2Endpoint } = await updateOauth2Endpoint(validatedParams.id, validatedData);

    return NextResponse.json(oauth2Endpoint, { status: 200 });
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

    const validatedParams = oauth2EndpointIdSchema.parse({ id });
    const { oauth2Endpoint } = await deleteOauth2Endpoint(validatedParams.id);

    return NextResponse.json(oauth2Endpoint, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
