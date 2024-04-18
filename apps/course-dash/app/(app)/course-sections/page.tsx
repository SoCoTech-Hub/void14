import CourseSectionList from "@/components/courseSections/CourseSectionList";
import NewCourseSectionModal from "@/components/courseSections/CourseSectionModal";
import { api } from "@/lib/trpc/api";

export default async function CourseSections() {
  const { courseSections } = await api.courseSections.getCourseSections.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Course Sections</h1>
        <NewCourseSectionModal />
      </div>
      <CourseSectionList courseSections={courseSections} />
    </main>
  );
}
