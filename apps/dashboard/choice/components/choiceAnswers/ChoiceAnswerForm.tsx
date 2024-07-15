"use client";

import { ChoiceAnswer, NewChoiceAnswerParams, insertChoiceAnswerParams } from "@soco/choice-db/schema/choiceAnswers";
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

const ChoiceAnswerForm = ({
  choiceAnswer,
  closeModal,
}: {
  choiceAnswer?: ChoiceAnswer;
  closeModal?: () => void;
}) => {
  const { data: choiceOptions } = trpc.choiceOptions.getChoiceOptions.useQuery();
  const { data: choices } = trpc.choices.getChoices.useQuery();
  const editing = !!choiceAnswer?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertChoiceAnswerParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertChoiceAnswerParams),
    defaultValues: choiceAnswer ?? {
      choiceOptionId: "",
     choiceId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.choiceAnswers.getChoiceAnswers.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Choice Answer ${action}d!`);
  };

  const { mutate: createChoiceAnswer, isLoading: isCreating } =
    trpc.choiceAnswers.createChoiceAnswer.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateChoiceAnswer, isLoading: isUpdating } =
    trpc.choiceAnswers.updateChoiceAnswer.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteChoiceAnswer, isLoading: isDeleting } =
    trpc.choiceAnswers.deleteChoiceAnswer.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewChoiceAnswerParams) => {
    if (editing) {
      updateChoiceAnswer({ ...values, id: choiceAnswer.id });
    } else {
      createChoiceAnswer(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="choiceOptionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Choice Option Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a choice option" />
                  </SelectTrigger>
                  <SelectContent>
                    {choiceOptions?.choiceOptions.map((choiceOption) => (
                      <SelectItem key={choiceOption.choiceOption.id} value={choiceOption.choiceOption.id.toString()}>
                        {choiceOption.choiceOption.id}  {/* TODO: Replace with a field from the choiceOption model */}
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
          name="choiceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Choice Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a choice" />
                  </SelectTrigger>
                  <SelectContent>
                    {choices?.choices.map((choice) => (
                      <SelectItem key={choice.id} value={choice.id.toString()}>
                        {choice.id}  {/* TODO: Replace with a field from the choice model */}
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
            onClick={() => deleteChoiceAnswer({ id: choiceAnswer.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ChoiceAnswerForm;
