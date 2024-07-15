"use client";

import { SurveyAnswer, NewSurveyAnswerParams, insertSurveyAnswerParams } from "@soco/survey-db/schema/surveyAnswers";
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

const SurveyAnswerForm = ({
  surveyAnswer,
  closeModal,
}: {
  surveyAnswer?: SurveyAnswer;
  closeModal?: () => void;
}) => {
  const { data: surveyQuestions } = trpc.surveyQuestions.getSurveyQuestions.useQuery();
  const { data: surveys } = trpc.surveys.getSurveys.useQuery();
  const editing = !!surveyAnswer?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertSurveyAnswerParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertSurveyAnswerParams),
    defaultValues: surveyAnswer ?? {
      answer1: "",
     answer2: "",
     surveyQuestionId: "",
     surveyId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.surveyAnswers.getSurveyAnswers.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Survey Answer ${action}d!`);
  };

  const { mutate: createSurveyAnswer, isLoading: isCreating } =
    trpc.surveyAnswers.createSurveyAnswer.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateSurveyAnswer, isLoading: isUpdating } =
    trpc.surveyAnswers.updateSurveyAnswer.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteSurveyAnswer, isLoading: isDeleting } =
    trpc.surveyAnswers.deleteSurveyAnswer.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewSurveyAnswerParams) => {
    if (editing) {
      updateSurveyAnswer({ ...values, id: surveyAnswer.id });
    } else {
      createSurveyAnswer(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="answer1"
          render={({ field }) => (<FormItem>
              <FormLabel>Answer1</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="answer2"
          render={({ field }) => (<FormItem>
              <FormLabel>Answer2</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surveyQuestionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Survey Question Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a survey question" />
                  </SelectTrigger>
                  <SelectContent>
                    {surveyQuestions?.surveyQuestions.map((surveyQuestion) => (
                      <SelectItem key={surveyQuestion.id} value={surveyQuestion.id.toString()}>
                        {surveyQuestion.id}  {/* TODO: Replace with a field from the surveyQuestion model */}
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
          name="surveyId"
          render={({ field }) => (<FormItem>
              <FormLabel>Survey Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a survey" />
                  </SelectTrigger>
                  <SelectContent>
                    {surveys?.surveys.map((survey) => (
                      <SelectItem key={survey.id} value={survey.id.toString()}>
                        {survey.id}  {/* TODO: Replace with a field from the survey model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            onClick={() => deleteSurveyAnswer({ id: surveyAnswer.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default SurveyAnswerForm;
