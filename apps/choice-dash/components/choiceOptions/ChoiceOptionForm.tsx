"use client";

import { ChoiceOption, NewChoiceOptionParams, insertChoiceOptionParams } from "@/lib/db/schema/choiceOptions";
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

const ChoiceOptionForm = ({
  choiceOption,
  closeModal,
}: {
  choiceOption?: ChoiceOption;
  closeModal?: () => void;
}) => {
  const { data: choices } = trpc.choices.getChoices.useQuery();
  const editing = !!choiceOption?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertChoiceOptionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertChoiceOptionParams),
    defaultValues: choiceOption ?? {
      maxAnswers: 0,
     text: "",
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

    await utils.choiceOptions.getChoiceOptions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Choice Option ${action}d!`);
  };

  const { mutate: createChoiceOption, isLoading: isCreating } =
    trpc.choiceOptions.createChoiceOption.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateChoiceOption, isLoading: isUpdating } =
    trpc.choiceOptions.updateChoiceOption.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteChoiceOption, isLoading: isDeleting } =
    trpc.choiceOptions.deleteChoiceOption.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewChoiceOptionParams) => {
    if (editing) {
      updateChoiceOption({ ...values, id: choiceOption.id });
    } else {
      createChoiceOption(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="maxAnswers"
          render={({ field }) => (<FormItem>
              <FormLabel>Max Answers</FormLabel>
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
            onClick={() => deleteChoiceOption({ id: choiceOption.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ChoiceOptionForm;
