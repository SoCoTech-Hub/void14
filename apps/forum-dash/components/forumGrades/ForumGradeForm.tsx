"use client";

import { ForumGrade, NewForumGradeParams, insertForumGradeParams } from "@/lib/db/schema/forumGrades";
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

const ForumGradeForm = ({
  forumGrade,
  closeModal,
}: {
  forumGrade?: ForumGrade;
  closeModal?: () => void;
}) => {
  
  const editing = !!forumGrade?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertForumGradeParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertForumGradeParams),
    defaultValues: forumGrade ?? {
      forum: "",
     grade: 0.0,
     itemNumber: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.forumGrades.getForumGrades.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Forum Grade ${action}d!`);
  };

  const { mutate: createForumGrade, isLoading: isCreating } =
    trpc.forumGrades.createForumGrade.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateForumGrade, isLoading: isUpdating } =
    trpc.forumGrades.updateForumGrade.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteForumGrade, isLoading: isDeleting } =
    trpc.forumGrades.deleteForumGrade.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewForumGradeParams) => {
    if (editing) {
      updateForumGrade({ ...values, id: forumGrade.id });
    } else {
      createForumGrade(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="forum"
          render={({ field }) => (<FormItem>
              <FormLabel>Forum</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (<FormItem>
              <FormLabel>Grade</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemNumber"
          render={({ field }) => (<FormItem>
              <FormLabel>Item Number</FormLabel>
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
            onClick={() => deleteForumGrade({ id: forumGrade.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ForumGradeForm;
