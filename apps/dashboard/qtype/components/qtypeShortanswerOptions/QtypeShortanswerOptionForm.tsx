"use client";

import { QtypeShortanswerOption, NewQtypeShortanswerOptionParams, insertQtypeShortanswerOptionParams } from "@soco/qtype-db/schema/qtypeShortanswerOptions";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const QtypeShortanswerOptionForm = ({
  qtypeShortanswerOption,
  closeModal,
}: {
  qtypeShortanswerOption?: QtypeShortanswerOption;
  closeModal?: () => void;
}) => {
  
  const editing = !!qtypeShortanswerOption?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQtypeShortanswerOptionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQtypeShortanswerOptionParams),
    defaultValues: qtypeShortanswerOption ?? {
      questionId: "",
     useCase: false
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.qtypeShortanswerOptions.getQtypeShortanswerOptions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Qtype Shortanswer Option ${action}d!`);
  };

  const { mutate: createQtypeShortanswerOption, isLoading: isCreating } =
    trpc.qtypeShortanswerOptions.createQtypeShortanswerOption.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQtypeShortanswerOption, isLoading: isUpdating } =
    trpc.qtypeShortanswerOptions.updateQtypeShortanswerOption.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQtypeShortanswerOption, isLoading: isDeleting } =
    trpc.qtypeShortanswerOptions.deleteQtypeShortanswerOption.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQtypeShortanswerOptionParams) => {
    if (editing) {
      updateQtypeShortanswerOption({ ...values, id: qtypeShortanswerOption.id });
    } else {
      createQtypeShortanswerOption(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="questionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="useCase"
          render={({ field }) => (<FormItem>
              <FormLabel>Use Case</FormLabel>
                <br />
            <FormControl>
              <Checkbox {...field} checked={!!field.value} onCheckedChange={field.onChange} value={""} />
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
            onClick={() => deleteQtypeShortanswerOption({ id: qtypeShortanswerOption.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QtypeShortanswerOptionForm;
