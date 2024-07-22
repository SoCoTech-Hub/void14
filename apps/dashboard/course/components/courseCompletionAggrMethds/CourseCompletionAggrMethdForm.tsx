"use client";

import { CourseCompletionAggrMethd, NewCourseCompletionAggrMethdParams, insertCourseCompletionAggrMethdParams } from "@soco/course-db/schema/courseCompletionAggrMethds";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@soco/ui/form";
import { Input } from "@soco/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@soco/ui/button";
import { z } from "zod";
import { Checkbox } from "@soco/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@soco/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CourseCompletionAggrMethdForm = ({
  courseCompletionAggrMethd,
  closeModal,
}: {
  courseCompletionAggrMethd?: CourseCompletionAggrMethd;
  closeModal?: () => void;
}) => {
  const { data: courses } = trpc.courses.getCourses.useQuery();
  const editing = !!courseCompletionAggrMethd?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertCourseCompletionAggrMethdParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertCourseCompletionAggrMethdParams),
    defaultValues: courseCompletionAggrMethd ?? {
      courseId: "",
     criteriaType: 0,
     method: false,
     value: 0.0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.courseCompletionAggrMethds.getCourseCompletionAggrMethds.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Course Completion Aggr Methd ${action}d!`);
  };

  const { mutate: createCourseCompletionAggrMethd, isLoading: isCreating } =
    trpc.courseCompletionAggrMethds.createCourseCompletionAggrMethd.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateCourseCompletionAggrMethd, isLoading: isUpdating } =
    trpc.courseCompletionAggrMethds.updateCourseCompletionAggrMethd.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteCourseCompletionAggrMethd, isLoading: isDeleting } =
    trpc.courseCompletionAggrMethds.deleteCourseCompletionAggrMethd.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewCourseCompletionAggrMethdParams) => {
    if (editing) {
      updateCourseCompletionAggrMethd({ ...values, id: courseCompletionAggrMethd.id });
    } else {
      createCourseCompletionAggrMethd(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (<FormItem>
              <FormLabel>Course Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses?.courses.map((course) => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.id}  {/* TODO: Replace with a field from the course model */}
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
          name="criteriaType"
          render={({ field }) => (<FormItem>
              <FormLabel>Criteria Type</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (<FormItem>
              <FormLabel>Method</FormLabel>
                <br />
            <FormControl>
              <Checkbox {...field} checked={!!field.value} onCheckedChange={field.onChange} value={""} />
            </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (<FormItem>
              <FormLabel>Value</FormLabel>
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
            onClick={() => deleteCourseCompletionAggrMethd({ id: courseCompletionAggrMethd.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default CourseCompletionAggrMethdForm;
