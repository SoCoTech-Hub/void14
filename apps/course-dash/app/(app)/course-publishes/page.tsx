import CoursePublishList from "@/components/coursePublishes/CoursePublishList";
import NewCoursePublishModal from "@/components/coursePublishes/CoursePublishModal";
import { api } from "@/lib/trpc/api";

export default async function CoursePublishes() {
  const { coursePublishes } = await api.coursePublishes.getCoursePublishes.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Course Publishes</h1>
        <NewCoursePublishModal />
      </div>
      <CoursePublishList coursePublishes={coursePublishes} />
    </main>
  );
}
