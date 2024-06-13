import ToolRecyclebinCourseList from "@/components/toolRecyclebinCourses/ToolRecyclebinCourseList";
import NewToolRecyclebinCourseModal from "@/components/toolRecyclebinCourses/ToolRecyclebinCourseModal";
import { api } from "@/lib/trpc/api";

export default async function ToolRecyclebinCourses() {
  const { toolRecyclebinCourses } = await api.toolRecyclebinCourses.getToolRecyclebinCourses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tool Recyclebin Courses</h1>
        <NewToolRecyclebinCourseModal />
      </div>
      <ToolRecyclebinCourseList toolRecyclebinCourses={toolRecyclebinCourses} />
    </main>
  );
}
