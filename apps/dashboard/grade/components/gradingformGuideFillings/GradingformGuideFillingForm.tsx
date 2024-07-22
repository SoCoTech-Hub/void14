"use client";

import { GradingformGuideFilling, NewGradingformGuideFillingParams, insertGradingformGuideFillingParams } from "@soco/grade-db/schema/gradingformGuideFillings";
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

const GradingformGuideFillingForm = ({
  gradingformGuideFilling,
  closeModal,
}: {
  gradingformGuideFilling?: GradingformGuideFilling;
  closeModal?: () => void;
}) => {
  
  const editing = !!gradingformGuideFilling?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGradingformGuideFillingParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGradingformGuideFillingParams),
    defaultValues: gradingformGuideFilling ?? {
      criterionId: "",
     instanceId: "",
     remark: "",
     remarkFormat: 0,
     score: 0.0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.gradingformGuideFillings.getGradingformGuideFillings.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Gradingform Guide Filling ${action}d!`);
  };

  const { mutate: createGradingformGuideFilling, isLoading: isCreating } =
    trpc.gradingformGuideFillings.createGradingformGuideFilling.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGradingformGuideFilling, isLoading: isUpdating } =
    trpc.gradingformGuideFillings.updateGradingformGuideFilling.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGradingformGuideFilling, isLoading: isDeleting } =
    trpc.gradingformGuideFillings.deleteGradingformGuideFilling.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGradingformGuideFillingParams) => {
    if (editing) {
      updateGradingformGuideFilling({ ...values, id: gradingformGuideFilling.id });
    } else {
      createGradingformGuideFilling(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="criterionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Criterion Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instanceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Instance Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remark"
          render={({ field }) => (<FormItem>
              <FormLabel>Remark</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remarkFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Remark Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="score"
          render={({ field }) => (<FormItem>
              <FormLabel>Score</FormLabel>
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
            onClick={() => deleteGradingformGuideFilling({ id: gradingformGuideFilling.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GradingformGuideFillingForm;
