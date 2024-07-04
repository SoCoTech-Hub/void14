import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type SupportTicketId, supportTicketIdSchema, supportTickets } from "@/lib/db/schema/supportTickets";
import { supportDepartments } from "@/lib/db/schema/supportDepartments";
import { supportTopics } from "@/lib/db/schema/supportTopics";
import { supportStatuses } from "@/lib/db/schema/supportStatuses";

export const getSupportTickets = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ supportTicket: supportTickets, supportDepartment: supportDepartments, supportTopic: supportTopics, supportStatus: supportStatuses }).from(supportTickets).leftJoin(supportDepartments, eq(supportTickets.supportDepartmentId, supportDepartments.id)).leftJoin(supportTopics, eq(supportTickets.supportTopicId, supportTopics.id)).leftJoin(supportStatuses, eq(supportTickets.supportStatusId, supportStatuses.id)).where(eq(supportTickets.userId, session?.user.id!));
  const s = rows .map((r) => ({ ...r.supportTicket, supportDepartment: r.supportDepartment, supportTopic: r.supportTopic, supportStatus: r.supportStatus})); 
  return { supportTickets: s };
};

export const getSupportTicketById = async (id: SupportTicketId) => {
  const { session } = await getUserAuth();
  const { id: supportTicketId } = supportTicketIdSchema.parse({ id });
  const [row] = await db.select({ supportTicket: supportTickets, supportDepartment: supportDepartments, supportTopic: supportTopics, supportStatus: supportStatuses }).from(supportTickets).where(and(eq(supportTickets.id, supportTicketId), eq(supportTickets.userId, session?.user.id!))).leftJoin(supportDepartments, eq(supportTickets.supportDepartmentId, supportDepartments.id)).leftJoin(supportTopics, eq(supportTickets.supportTopicId, supportTopics.id)).leftJoin(supportStatuses, eq(supportTickets.supportStatusId, supportStatuses.id));
  if (row === undefined) return {};
  const s =  { ...row.supportTicket, supportDepartment: row.supportDepartment, supportTopic: row.supportTopic, supportStatus: row.supportStatus } ;
  return { supportTicket: s };
};


