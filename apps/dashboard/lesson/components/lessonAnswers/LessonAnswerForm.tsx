"use client";

import { LessonAnswer, NewLessonAnswerParams, insertLessonAnswerParams } from "@soco/lesson-db/schema/lessonAnswers";
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

const LessonAnswerForm = ({
  lessonAnswer,
  closeModal,
}: {
  lessonAnswer?: LessonAnswer;
  closeModal?: () => void;
}) => {
  const { data: lessons } = trpc.lessons.getLessons.useQuery();
  const { data: lessonPages } = trpc.lessonPages.getLessonPages.useQuery();
  const editing = !!lessonAnswer?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertLessonAnswerParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertLessonAnswerParams),
    defaultValues: lessonAnswer ?? {
      answer: "",
     answerFormat: 0,
     flags: false,
     grade: 0,
     jumpTo: "",
     lessonId: "",
     lessonPageId: "",
     response: "",
     responseFormat: 0,
     score: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.lessonAnswers.getLessonAnswers.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Lesson Answer ${action}d!`);
  };

  const { mutate: createLessonAnswer, isLoading: isCreating } =
    trpc.lessonAnswers.createLessonAnswer.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateLessonAnswer, isLoading: isUpdating } =
    trpc.lessonAnswers.updateLessonAnswer.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteLessonAnswer, isLoading: isDeleting } =
    trpc.lessonAnswers.deleteLessonAnswer.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewLessonAnswerParams) => {
    if (editing) {
      updateLessonAnswer({ ...values, id: lessonAnswer.id });
    } else {
      createLessonAnswer(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (<FormItem>
              <FormLabel>Answer</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="answerFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Answer Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flags"
          render={({ field }) => (<FormItem>
              <FormLabel>Flags</FormLabel>
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
          name="jumpTo"
          render={({ field }) => (<FormItem>
              <FormLabel>Jump To</FormLabel>
                <FormControl>
            <Input {...field} />
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
          name="response"
          render={({ field }) => (<FormItem>
              <FormLabel>Response</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responseFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Response Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="score"
          render={({ field }) => (<FormItem>
              <FormLabel>Score</FormLabel>
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
            onClick={() => deleteLessonAnswer({ id: lessonAnswer.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default LessonAnswerForm;
