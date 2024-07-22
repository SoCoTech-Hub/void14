"use client";

import { LessonAttempt, NewLessonAttemptParams, insertLessonAttemptParams } from "@soco/lesson-db/schema/lessonAttempts";
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

const LessonAttemptForm = ({
  lessonAttempt,
  closeModal,
}: {
  lessonAttempt?: LessonAttempt;
  closeModal?: () => void;
}) => {
  const { data: lessonAnswers } = trpc.lessonAnswers.getLessonAnswers.useQuery();
  const { data: lessonPages } = trpc.lessonPages.getLessonPages.useQuery();
  const { data: lessons } = trpc.lessons.getLessons.useQuery();
  const editing = !!lessonAttempt?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertLessonAttemptParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertLessonAttemptParams),
    defaultValues: lessonAttempt ?? {
      lessonAnswerId: "",
     lessonPageId: "",
     lessonId: "",
     correct: false,
     retry: 0,
     userAnswer: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.lessonAttempts.getLessonAttempts.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Lesson Attempt ${action}d!`);
  };

  const { mutate: createLessonAttempt, isLoading: isCreating } =
    trpc.lessonAttempts.createLessonAttempt.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateLessonAttempt, isLoading: isUpdating } =
    trpc.lessonAttempts.updateLessonAttempt.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteLessonAttempt, isLoading: isDeleting } =
    trpc.lessonAttempts.deleteLessonAttempt.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewLessonAttemptParams) => {
    if (editing) {
      updateLessonAttempt({ ...values, id: lessonAttempt.id });
    } else {
      createLessonAttempt(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="lessonAnswerId"
          render={({ field }) => (<FormItem>
              <FormLabel>Lesson Answer Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a lesson answer" />
                  </SelectTrigger>
                  <SelectContent>
                    {lessonAnswers?.lessonAnswers.map((lessonAnswer) => (
                      <SelectItem key={lessonAnswer.lessonAnswer.id} value={lessonAnswer.lessonAnswer.id.toString()}>
                        {lessonAnswer.lessonAnswer.id}  {/* TODO: Replace with a field from the lessonAnswer model */}
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
          name="lessonPageId"
          render={({ field }) => (<FormItem>
              <FormLabel>Lesson Page Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a lesson page" />
                  </SelectTrigger>
                  <SelectContent>
                    {lessonPages?.lessonPages.map((lessonPage) => (
                      <SelectItem key={lessonPage.id} value={lessonPage.id.toString()}>
                        {lessonPage.id}  {/* TODO: Replace with a field from the lessonPage model */}
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
          name="lessonId"
          render={({ field }) => (<FormItem>
              <FormLabel>Lesson Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a lesson" />
                  </SelectTrigger>
                  <SelectContent>
                    {lessons?.lessons.map((lesson) => (
                      <SelectItem key={lesson.id} value={lesson.id.toString()}>
                        {lesson.id}  {/* TODO: Replace with a field from the lesson model */}
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
          name="correct"
          render={({ field }) => (<FormItem>
              <FormLabel>Correct</FormLabel>
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
          name="retry"
          render={({ field }) => (<FormItem>
              <FormLabel>Retry</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userAnswer"
          render={({ field }) => (<FormItem>
              <FormLabel>User Answer</FormLabel>
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
            onClick={() => deleteLessonAttempt({ id: lessonAttempt.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default LessonAttemptForm;
