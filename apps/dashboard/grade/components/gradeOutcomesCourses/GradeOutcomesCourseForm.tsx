"use client";

import { GradeOutcomesCourse, NewGradeOutcomesCourseParams, insertGradeOutcomesCourseParams } from "@soco/grade-db/schema/gradeOutcomesCourses";
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

const GradeOutcomesCourseForm = ({
  gradeOutcomesCourse,
  closeModal,
}: {
  gradeOutcomesCourse?: GradeOutcomesCourse;
  closeModal?: () => void;
}) => {
  const { data: gradeOutcomes } = trpc.gradeOutcomes.getGradeOutcomes.useQuery();
  const editing = !!gradeOutcomesCourse?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGradeOutcomesCourseParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGradeOutcomesCourseParams),
    defaultValues: gradeOutcomesCourse ?? {
      gradeOutcomeId: "",
     courseId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.gradeOutcomesCourses.getGradeOutcomesCourses.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Grade Outcomes Course ${action}d!`);
  };

  const { mutate: createGradeOutcomesCourse, isLoading: isCreating } =
    trpc.gradeOutcomesCourses.createGradeOutcomesCourse.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGradeOutcomesCourse, isLoading: isUpdating } =
    trpc.gradeOutcomesCourses.updateGradeOutcomesCourse.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGradeOutcomesCourse, isLoading: isDeleting } =
    trpc.gradeOutcomesCourses.deleteGradeOutcomesCourse.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGradeOutcomesCourseParams) => {
    if (editing) {
      updateGradeOutcomesCourse({ ...values, id: gradeOutcomesCourse.id });
    } else {
      createGradeOutcomesCourse(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="gradeOutcomeId"
          render={({ field }) => (<FormItem>
              <FormLabel>Grade Outcome Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a grade outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeOutcomes?.gradeOutcomes.map((gradeOutcome) => (
                      <SelectItem key={gradeOutcome.id} value={gradeOutcome.id.toString()}>
                        {gradeOutcome.id}  {/* TODO: Replace with a field from the gradeOutcome model */}
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
            onClick={() => deleteGradeOutcomesCourse({ id: gradeOutcomesCourse.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GradeOutcomesCourseForm;
