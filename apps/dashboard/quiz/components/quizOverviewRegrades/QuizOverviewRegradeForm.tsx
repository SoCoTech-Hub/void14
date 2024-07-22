"use client";

import { QuizOverviewRegrade, NewQuizOverviewRegradeParams, insertQuizOverviewRegradeParams } from "@soco/quiz-db/schema/quizOverviewRegrades";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const QuizOverviewRegradeForm = ({
  quizOverviewRegrade,
  closeModal,
}: {
  quizOverviewRegrade?: QuizOverviewRegrade;
  closeModal?: () => void;
}) => {
  
  const editing = !!quizOverviewRegrade?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuizOverviewRegradeParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuizOverviewRegradeParams),
    defaultValues: quizOverviewRegrade ?? {
      newFraction: 0.0,
     oldFraction: 0.0,
     questionUsageId: "",
     regraded: false,
     slotId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.quizOverviewRegrades.getQuizOverviewRegrades.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Quiz Overview Regrade ${action}d!`);
  };

  const { mutate: createQuizOverviewRegrade, isLoading: isCreating } =
    trpc.quizOverviewRegrades.createQuizOverviewRegrade.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuizOverviewRegrade, isLoading: isUpdating } =
    trpc.quizOverviewRegrades.updateQuizOverviewRegrade.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuizOverviewRegrade, isLoading: isDeleting } =
    trpc.quizOverviewRegrades.deleteQuizOverviewRegrade.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuizOverviewRegradeParams) => {
    if (editing) {
      updateQuizOverviewRegrade({ ...values, id: quizOverviewRegrade.id });
    } else {
      createQuizOverviewRegrade(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="newFraction"
          render={({ field }) => (<FormItem>
              <FormLabel>New Fraction</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="oldFraction"
          render={({ field }) => (<FormItem>
              <FormLabel>Old Fraction</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="questionUsageId"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Usage Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="regraded"
          render={({ field }) => (<FormItem>
              <FormLabel>Regraded</FormLabel>
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
          name="slotId"
          render={({ field }) => (<FormItem>
              <FormLabel>Slot Id</FormLabel>
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
            onClick={() => deleteQuizOverviewRegrade({ id: quizOverviewRegrade.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuizOverviewRegradeForm;
