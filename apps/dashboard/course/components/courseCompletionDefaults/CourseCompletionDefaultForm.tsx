"use client";

import { useRouter } from "next/navigation";
import { Button } from "@soco/ui/button";
import { Calendar } from "@soco/ui/calendar";
import { Checkbox } from "@soco/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@soco/ui/form";
import { Input } from "@soco/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@soco/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@soco/ui/select";
import {
  CourseCompletionDefault,
  insertCourseCompletionDefaultParams,
  NewCourseCompletionDefaultParams,
} from "@soco/course-db/schema/courseCompletionDefaults";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@soco/utils";

const CourseCompletionDefaultForm = ({
  courseCompletionDefault,
  closeModal,
}: {
  courseCompletionDefault?: CourseCompletionDefault;
  closeModal?: () => void;
}) => {
  const { data: courses } = trpc.courses.getCourses.useQuery();
  const editing = !!courseCompletionDefault?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertCourseCompletionDefaultParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertCourseCompletionDefaultParams),
    defaultValues: courseCompletionDefault ?? {
      completionExpectedDate: "",
      courseId: "",
      moduleId: "",
      completion: false,
      completionPassGrade: false,
      completionUseGrade: false,
      completionView: false,
      customRules: "",
    },
  });

  const onError = async (
    action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(data.error);
      return;
    }
    return;
  };

  const onSuccess = async (
    action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(data.error);
      return;
    }

    await utils.courseCompletionDefaults.getCourseCompletionDefaults.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Course Completion Default ${action}d!`);
  };

  const { mutate: createCourseCompletionDefault, isLoading: isCreating } =
    trpc.courseCompletionDefaults.createCourseCompletionDefault.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateCourseCompletionDefault, isLoading: isUpdating } =
    trpc.courseCompletionDefaults.updateCourseCompletionDefault.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteCourseCompletionDefault, isLoading: isDeleting } =
    trpc.courseCompletionDefaults.deleteCourseCompletionDefault.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewCourseCompletionDefaultParams) => {
    if (editing) {
      updateCourseCompletionDefault({
        ...values,
        id: courseCompletionDefault.id,
      });
    } else {
      createCourseCompletionDefault(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="completionExpectedDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Completion Expected Date</FormLabel>
              <br />
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (
            <FormItem>
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
                      <SelectItem
                        key={course.course.id}
                        value={course.course.id.toString()}
                      >
                        {course.course.id}{" "}
                        {/* TODO: Replace with a field from the course model */}
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
          name="moduleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Id</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="completion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Completion</FormLabel>
              <br />
              <FormControl>
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  value={""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="completionPassGrade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Completion Pass Grade</FormLabel>
              <br />
              <FormControl>
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  value={""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="completionUseGrade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Completion Use Grade</FormLabel>
              <br />
              <FormControl>
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  value={""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="completionView"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Completion View</FormLabel>
              <br />
              <FormControl>
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  value={""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customRules"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Rules</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
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
            onClick={() =>
              deleteCourseCompletionDefault({ id: courseCompletionDefault.id })
            }
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default CourseCompletionDefaultForm;
