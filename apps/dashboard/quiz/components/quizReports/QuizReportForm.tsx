"use client";

import { QuizReport, NewQuizReportParams, insertQuizReportParams } from "@soco/quiz-db/schema/quizReports";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const QuizReportForm = ({
  quizReport,
  closeModal,
}: {
  quizReport?: QuizReport;
  closeModal?: () => void;
}) => {
  
  const editing = !!quizReport?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuizReportParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuizReportParams),
    defaultValues: quizReport ?? {
      capability: "",
     displayOrder: 0,
     name: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.quizReports.getQuizReports.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Quiz Report ${action}d!`);
  };

  const { mutate: createQuizReport, isLoading: isCreating } =
    trpc.quizReports.createQuizReport.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuizReport, isLoading: isUpdating } =
    trpc.quizReports.updateQuizReport.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuizReport, isLoading: isDeleting } =
    trpc.quizReports.deleteQuizReport.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuizReportParams) => {
    if (editing) {
      updateQuizReport({ ...values, id: quizReport.id });
    } else {
      createQuizReport(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="capability"
          render={({ field }) => (<FormItem>
              <FormLabel>Capability</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayOrder"
          render={({ field }) => (<FormItem>
              <FormLabel>Display Order</FormLabel>
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
            onClick={() => deleteQuizReport({ id: quizReport.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuizReportForm;
