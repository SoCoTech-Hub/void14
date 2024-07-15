"use client";

import { ForumTrackPref, NewForumTrackPrefParams, insertForumTrackPrefParams } from "@soco/forum-db/schema/forumTrackPrefs";
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

const ForumTrackPrefForm = ({
  forumTrackPref,
  closeModal,
}: {
  forumTrackPref?: ForumTrackPref;
  closeModal?: () => void;
}) => {
  const { data: forums } = trpc.forums.getForums.useQuery();
  const editing = !!forumTrackPref?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertForumTrackPrefParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertForumTrackPrefParams),
    defaultValues: forumTrackPref ?? {
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

    await utils.forumTrackPrefs.getForumTrackPrefs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Forum Track Pref ${action}d!`);
  };

  const { mutate: createForumTrackPref, isLoading: isCreating } =
    trpc.forumTrackPrefs.createForumTrackPref.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateForumTrackPref, isLoading: isUpdating } =
    trpc.forumTrackPrefs.updateForumTrackPref.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteForumTrackPref, isLoading: isDeleting } =
    trpc.forumTrackPrefs.deleteForumTrackPref.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewForumTrackPrefParams) => {
    if (editing) {
      updateForumTrackPref({ ...values, id: forumTrackPref.id });
    } else {
      createForumTrackPref(values);
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
            onClick={() => deleteForumTrackPref({ id: forumTrackPref.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ForumTrackPrefForm;
