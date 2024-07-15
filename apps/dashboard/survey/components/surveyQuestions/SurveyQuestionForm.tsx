"use client";

import { SurveyQuestion, NewSurveyQuestionParams, insertSurveyQuestionParams } from "@soco/survey-db/schema/surveyQuestions";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SurveyQuestionForm = ({
  surveyQuestion,
  closeModal,
}: {
  surveyQuestion?: SurveyQuestion;
  closeModal?: () => void;
}) => {
  
  const editing = !!surveyQuestion?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertSurveyQuestionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertSurveyQuestionParams),
    defaultValues: surveyQuestion ?? {
      intro: "",
     multi: "",
     options: "",
     shortText: "",
     text: "",
     type: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.surveyQuestions.getSurveyQuestions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Survey Question ${action}d!`);
  };

  const { mutate: createSurveyQuestion, isLoading: isCreating } =
    trpc.surveyQuestions.createSurveyQuestion.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateSurveyQuestion, isLoading: isUpdating } =
    trpc.surveyQuestions.updateSurveyQuestion.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteSurveyQuestion, isLoading: isDeleting } =
    trpc.surveyQuestions.deleteSurveyQuestion.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewSurveyQuestionParams) => {
    if (editing) {
      updateSurveyQuestion({ ...values, id: surveyQuestion.id });
    } else {
      createSurveyQuestion(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="intro"
          render={({ field }) => (<FormItem>
              <FormLabel>Intro</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="multi"
          render={({ field }) => (<FormItem>
              <FormLabel>Multi</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (<FormItem>
              <FormLabel>Options</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortText"
          render={({ field }) => (<FormItem>
              <FormLabel>Short Text</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (<FormItem>
              <FormLabel>Text</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (<FormItem>
              <FormLabel>Type</FormLabel>
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
            onClick={() => deleteSurveyQuestion({ id: surveyQuestion.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default SurveyQuestionForm;
