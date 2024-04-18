import CourseCategoryList from "@/components/courseCategories/CourseCategoryList";
import NewCourseCategoryModal from "@/components/courseCategories/CourseCategoryModal";
import { api } from "@/lib/trpc/api";

export default async function CourseCategories() {
  const { courseCategories } = await api.courseCategories.getCourseCategories.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Course Categories</h1>
        <NewCourseCategoryModal />
      </div>
      <CourseCategoryList courseCategories={courseCategories} />
    </main>
  );
}
