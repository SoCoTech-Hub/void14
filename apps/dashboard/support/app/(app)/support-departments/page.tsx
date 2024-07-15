import SupportDepartmentList from "@/components/supportDepartments/SupportDepartmentList";
import NewSupportDepartmentModal from "@/components/supportDepartments/SupportDepartmentModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function SupportDepartments() {
  await checkAuth();
  const { supportDepartments } = await api.supportDepartments.getSupportDepartments.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Support Departments</h1>
        <NewSupportDepartmentModal />
      </div>
      <SupportDepartmentList supportDepartments={supportDepartments} />
    </main>
  );
}
