"use client";

import { CompetencyUserCompCourse, NewCompetencyUserCompCourseParams, insertCompetencyUserCompCourseParams } from "@/lib/db/schema/competencyUserCompCourses";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CompetencyUserCompCourseForm = ({
  competencyUserCompCourse,
  closeModal,
}: {
  competencyUserCompCourse?: CompetencyUserCompCourse;
  closeModal?: () => void;
}) => {
  const { data: competencies } = trpc.competencies.getCompetencies.useQuery();
  const editing = !!competencyUserCompCourse?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertCompetencyUserCompCourseParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertCompetencyUserCompCourseParams),
    defaultValues: competencyUserCompCourse ?? {
      competencyId: "",
     courseId: "",
     grade: 0,
     proficiency: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.competencyUserCompCourses.getCompetencyUserCompCourses.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Competency User Comp Course ${action}d!`);
  };

  const { mutate: createCompetencyUserCompCourse, isLoading: isCreating } =
    trpc.competencyUserCompCourses.createCompetencyUserCompCourse.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateCompetencyUserCompCourse, isLoading: isUpdating } =
    trpc.competencyUserCompCourses.updateCompetencyUserCompCourse.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteCompetencyUserCompCourse, isLoading: isDeleting } =
    trpc.competencyUserCompCourses.deleteCompetencyUserCompCourse.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewCompetencyUserCompCourseParams) => {
    if (editing) {
      updateCompetencyUserCompCourse({ ...values, id: competencyUserCompCourse.id });
    } else {
      createCompetencyUserCompCourse(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="competencyId"
          render={({ field }) => (<FormItem>
              <FormLabel>Competency Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a competency" />
                  </SelectTrigger>
                  <SelectContent>
                    {competencies?.competencies.map((competency) => (
                      <SelectItem key={competency.competency.id} value={competency.competency.id.toString()}>
                        {competency.competency.id}  {/* TODO: Replace with a field from the competency model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (<FormItem>
              <FormLabel>Course Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (<FormItem>
              <FormLabel>Grade</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="proficiency"
          render={({ field }) => (<FormItem>
              <FormLabel>Proficiency</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteCompetencyUserCompCourse({ id: competencyUserCompCourse.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default CompetencyUserCompCourseForm;
