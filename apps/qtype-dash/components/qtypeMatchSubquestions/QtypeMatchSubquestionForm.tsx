"use client";

import { QtypeMatchSubquestion, NewQtypeMatchSubquestionParams, insertQtypeMatchSubquestionParams } from "@/lib/db/schema/qtypeMatchSubquestions";
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

const QtypeMatchSubquestionForm = ({
  qtypeMatchSubquestion,
  closeModal,
}: {
  qtypeMatchSubquestion?: QtypeMatchSubquestion;
  closeModal?: () => void;
}) => {
  
  const editing = !!qtypeMatchSubquestion?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQtypeMatchSubquestionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQtypeMatchSubquestionParams),
    defaultValues: qtypeMatchSubquestion ?? {
      answerText: "",
     questionId: "",
     questionText: "",
     questionTextFormat: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.qtypeMatchSubquestions.getQtypeMatchSubquestions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Qtype Match Subquestion ${action}d!`);
  };

  const { mutate: createQtypeMatchSubquestion, isLoading: isCreating } =
    trpc.qtypeMatchSubquestions.createQtypeMatchSubquestion.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQtypeMatchSubquestion, isLoading: isUpdating } =
    trpc.qtypeMatchSubquestions.updateQtypeMatchSubquestion.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQtypeMatchSubquestion, isLoading: isDeleting } =
    trpc.qtypeMatchSubquestions.deleteQtypeMatchSubquestion.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQtypeMatchSubquestionParams) => {
    if (editing) {
      updateQtypeMatchSubquestion({ ...values, id: qtypeMatchSubquestion.id });
    } else {
      createQtypeMatchSubquestion(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="answerText"
          render={({ field }) => (<FormItem>
              <FormLabel>Answer Text</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
          name="questionText"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Text</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="questionTextFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Text Format</FormLabel>
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
            onClick={() => deleteQtypeMatchSubquestion({ id: qtypeMatchSubquestion.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QtypeMatchSubquestionForm;
