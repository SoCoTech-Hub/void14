import CourseFormatOptionList from "@/components/courseFormatOptions/CourseFormatOptionList";
import NewCourseFormatOptionModal from "@/components/courseFormatOptions/CourseFormatOptionModal";
import { api } from "@/lib/trpc/api";

export default async function CourseFormatOptions() {
  const { courseFormatOptions } = await api.courseFormatOptions.getCourseFormatOptions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Course Format Options</h1>
        <NewCourseFormatOptionModal />
      </div>
      <CourseFormatOptionList courseFormatOptions={courseFormatOptions} />
    </main>
  );
}
