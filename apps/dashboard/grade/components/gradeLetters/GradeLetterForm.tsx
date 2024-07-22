"use client";

import { GradeLetter, NewGradeLetterParams, insertGradeLetterParams } from "@soco/grade-db/schema/gradeLetters";
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

const GradeLetterForm = ({
  gradeLetter,
  closeModal,
}: {
  gradeLetter?: GradeLetter;
  closeModal?: () => void;
}) => {
  
  const editing = !!gradeLetter?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGradeLetterParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGradeLetterParams),
    defaultValues: gradeLetter ?? {
      contextId: "",
     letter: "",
     lowerBoundary: 0.0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.gradeLetters.getGradeLetters.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Grade Letter ${action}d!`);
  };

  const { mutate: createGradeLetter, isLoading: isCreating } =
    trpc.gradeLetters.createGradeLetter.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGradeLetter, isLoading: isUpdating } =
    trpc.gradeLetters.updateGradeLetter.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGradeLetter, isLoading: isDeleting } =
    trpc.gradeLetters.deleteGradeLetter.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGradeLetterParams) => {
    if (editing) {
      updateGradeLetter({ ...values, id: gradeLetter.id });
    } else {
      createGradeLetter(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="contextId"
          render={({ field }) => (<FormItem>
              <FormLabel>Context Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="letter"
          render={({ field }) => (<FormItem>
              <FormLabel>Letter</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lowerBoundary"
          render={({ field }) => (<FormItem>
              <FormLabel>Lower Boundary</FormLabel>
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
            onClick={() => deleteGradeLetter({ id: gradeLetter.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GradeLetterForm;
