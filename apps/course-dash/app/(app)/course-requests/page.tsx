import CourseRequestList from "@/components/courseRequests/CourseRequestList";
import NewCourseRequestModal from "@/components/courseRequests/CourseRequestModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function CourseRequests() {
  await checkAuth();
  const { courseRequests } = await api.courseRequests.getCourseRequests.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Course Requests</h1>
        <NewCourseRequestModal />
      </div>
      <CourseRequestList courseRequests={courseRequests} />
    </main>
  );
}
