"use client";

import { SurveyAnalysiss, NewSurveyAnalysissParams, insertSurveyAnalysissParams } from "@/lib/db/schema/surveyAnalysiss";
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

const SurveyAnalysissForm = ({
  surveyAnalysiss,
  closeModal,
}: {
  surveyAnalysiss?: SurveyAnalysiss;
  closeModal?: () => void;
}) => {
  const { data: surveys } = trpc.surveys.getSurveys.useQuery();
  const editing = !!surveyAnalysiss?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertSurveyAnalysissParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertSurveyAnalysissParams),
    defaultValues: surveyAnalysiss ?? {
      notes: "",
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

    await utils.surveyAnalysiss.getSurveyAnalysiss.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Survey Analysiss ${action}d!`);
  };

  const { mutate: createSurveyAnalysiss, isLoading: isCreating } =
    trpc.surveyAnalysiss.createSurveyAnalysiss.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateSurveyAnalysiss, isLoading: isUpdating } =
    trpc.surveyAnalysiss.updateSurveyAnalysiss.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteSurveyAnalysiss, isLoading: isDeleting } =
    trpc.surveyAnalysiss.deleteSurveyAnalysiss.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewSurveyAnalysissParams) => {
    if (editing) {
      updateSurveyAnalysiss({ ...values, id: surveyAnalysiss.id });
    } else {
      createSurveyAnalysiss(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (<FormItem>
              <FormLabel>Notes</FormLabel>
                <FormControl>
            <Input {...field} />
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
            onClick={() => deleteSurveyAnalysiss({ id: surveyAnalysiss.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default SurveyAnalysissForm;
