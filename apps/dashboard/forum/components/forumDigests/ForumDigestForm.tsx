"use client";

import { ForumDigest, NewForumDigestParams, insertForumDigestParams } from "@soco/forum-db/schema/forumDigests";
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

const ForumDigestForm = ({
  forumDigest,
  closeModal,
}: {
  forumDigest?: ForumDigest;
  closeModal?: () => void;
}) => {
  
  const editing = !!forumDigest?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertForumDigestParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertForumDigestParams),
    defaultValues: forumDigest ?? {
      forum: "",
     mailDigest: false
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.forumDigests.getForumDigests.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Forum Digest ${action}d!`);
  };

  const { mutate: createForumDigest, isLoading: isCreating } =
    trpc.forumDigests.createForumDigest.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateForumDigest, isLoading: isUpdating } =
    trpc.forumDigests.updateForumDigest.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteForumDigest, isLoading: isDeleting } =
    trpc.forumDigests.deleteForumDigest.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewForumDigestParams) => {
    if (editing) {
      updateForumDigest({ ...values, id: forumDigest.id });
    } else {
      createForumDigest(values);
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
          name="mailDigest"
          render={({ field }) => (<FormItem>
              <FormLabel>Mail Digest</FormLabel>
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
            onClick={() => deleteForumDigest({ id: forumDigest.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ForumDigestForm;
