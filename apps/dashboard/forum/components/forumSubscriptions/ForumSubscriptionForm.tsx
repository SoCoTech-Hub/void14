"use client";

import { ForumSubscription, NewForumSubscriptionParams, insertForumSubscriptionParams } from "@soco/forum-db/schema/forumSubscriptions";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@soco/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ForumSubscriptionForm = ({
  forumSubscription,
  closeModal,
}: {
  forumSubscription?: ForumSubscription;
  closeModal?: () => void;
}) => {
  const { data: forums } = trpc.forums.getForums.useQuery();
  const editing = !!forumSubscription?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertForumSubscriptionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertForumSubscriptionParams),
    defaultValues: forumSubscription ?? {
      forumId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.forumSubscriptions.getForumSubscriptions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Forum Subscription ${action}d!`);
  };

  const { mutate: createForumSubscription, isLoading: isCreating } =
    trpc.forumSubscriptions.createForumSubscription.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateForumSubscription, isLoading: isUpdating } =
    trpc.forumSubscriptions.updateForumSubscription.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteForumSubscription, isLoading: isDeleting } =
    trpc.forumSubscriptions.deleteForumSubscription.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewForumSubscriptionParams) => {
    if (editing) {
      updateForumSubscription({ ...values, id: forumSubscription.id });
    } else {
      createForumSubscription(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="forumId"
          render={({ field }) => (<FormItem>
              <FormLabel>Forum Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a forum" />
                  </SelectTrigger>
                  <SelectContent>
                    {forums?.forums.map((forum) => (
                      <SelectItem key={forum.id} value={forum.id.toString()}>
                        {forum.id}  {/* TODO: Replace with a field from the forum model */}
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
            onClick={() => deleteForumSubscription({ id: forumSubscription.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ForumSubscriptionForm;
