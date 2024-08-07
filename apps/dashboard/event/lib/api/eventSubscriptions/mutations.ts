import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type EventSubscriptionId, 
  type NewEventSubscriptionParams,
  type UpdateEventSubscriptionParams, 
  updateEventSubscriptionSchema,
  insertEventSubscriptionSchema, 
  eventSubscriptions,
  eventSubscriptionIdSchema 
} from "@/lib/db/schema/eventSubscriptions";
import { getUserAuth } from "@/lib/auth/utils";

export const createEventSubscription = async (eventSubscription: NewEventSubscriptionParams) => {
  const { session } = await getUserAuth();
  const newEventSubscription = insertEventSubscriptionSchema.parse({ ...eventSubscription, userId: session?.user.id! });
  try {
    const [e] =  await db.insert(eventSubscriptions).values(newEventSubscription).returning();
    return { eventSubscription: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEventSubscription = async (id: EventSubscriptionId, eventSubscription: UpdateEventSubscriptionParams) => {
  const { session } = await getUserAuth();
  const { id: eventSubscriptionId } = eventSubscriptionIdSchema.parse({ id });
  const newEventSubscription = updateEventSubscriptionSchema.parse({ ...eventSubscription, userId: session?.user.id! });
  try {
    const [e] =  await db
     .update(eventSubscriptions)
     .set({...newEventSubscription, updatedAt: new Date() })
     .where(and(eq(eventSubscriptions.id, eventSubscriptionId!), eq(eventSubscriptions.userId, session?.user.id!)))
     .returning();
    return { eventSubscription: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEventSubscription = async (id: EventSubscriptionId) => {
  const { session } = await getUserAuth();
  const { id: eventSubscriptionId } = eventSubscriptionIdSchema.parse({ id });
  try {
    const [e] =  await db.delete(eventSubscriptions).where(and(eq(eventSubscriptions.id, eventSubscriptionId!), eq(eventSubscriptions.userId, session?.user.id!)))
    .returning();
    return { eventSubscription: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

