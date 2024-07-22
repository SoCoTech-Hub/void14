"use client";

import { QuestionDatasetDefinition, NewQuestionDatasetDefinitionParams, insertQuestionDatasetDefinitionParams } from "@soco/question-db/schema/questionDatasetDefinitions";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@soco/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const QuestionDatasetDefinitionForm = ({
  questionDatasetDefinition,
  closeModal,
}: {
  questionDatasetDefinition?: QuestionDatasetDefinition;
  closeModal?: () => void;
}) => {
  const { data: questionCategories } = trpc.questionCategories.getQuestionCategories.useQuery();
  const editing = !!questionDatasetDefinition?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionDatasetDefinitionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionDatasetDefinitionParams),
    defaultValues: questionDatasetDefinition ?? {
      questionCategoryId: "",
     itemCount: 0,
     name: "",
     options: "",
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

    await utils.questionDatasetDefinitions.getQuestionDatasetDefinitions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Dataset Definition ${action}d!`);
  };

  const { mutate: createQuestionDatasetDefinition, isLoading: isCreating } =
    trpc.questionDatasetDefinitions.createQuestionDatasetDefinition.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionDatasetDefinition, isLoading: isUpdating } =
    trpc.questionDatasetDefinitions.updateQuestionDatasetDefinition.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionDatasetDefinition, isLoading: isDeleting } =
    trpc.questionDatasetDefinitions.deleteQuestionDatasetDefinition.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionDatasetDefinitionParams) => {
    if (editing) {
      updateQuestionDatasetDefinition({ ...values, id: questionDatasetDefinition.id });
    } else {
      createQuestionDatasetDefinition(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="questionCategoryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Category Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a question category" />
                  </SelectTrigger>
                  <SelectContent>
                    {questionCategories?.questionCategories.map((questionCategory) => (
                      <SelectItem key={questionCategory.id} value={questionCategory.id.toString()}>
                        {questionCategory.id}  {/* TODO: Replace with a field from the questionCategory model */}
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
          name="itemCount"
          render={({ field }) => (<FormItem>
              <FormLabel>Item Count</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (<FormItem>
              <FormLabel>Name</FormLabel>
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
            onClick={() => deleteQuestionDatasetDefinition({ id: questionDatasetDefinition.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionDatasetDefinitionForm;
