"use client";

import { TagCorrelation, NewTagCorrelationParams, insertTagCorrelationParams } from "@soco/tag-db/schema/tagCorrelations";
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

const TagCorrelationForm = ({
  tagCorrelation,
  closeModal,
}: {
  tagCorrelation?: TagCorrelation;
  closeModal?: () => void;
}) => {
  const { data: tags } = trpc.tags.getTags.useQuery();
  const editing = !!tagCorrelation?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertTagCorrelationParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertTagCorrelationParams),
    defaultValues: tagCorrelation ?? {
      correlatedTags: "",
     tagId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.tagCorrelations.getTagCorrelations.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Tag Correlation ${action}d!`);
  };

  const { mutate: createTagCorrelation, isLoading: isCreating } =
    trpc.tagCorrelations.createTagCorrelation.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateTagCorrelation, isLoading: isUpdating } =
    trpc.tagCorrelations.updateTagCorrelation.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteTagCorrelation, isLoading: isDeleting } =
    trpc.tagCorrelations.deleteTagCorrelation.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewTagCorrelationParams) => {
    if (editing) {
      updateTagCorrelation({ ...values, id: tagCorrelation.id });
    } else {
      createTagCorrelation(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="correlatedTags"
          render={({ field }) => (<FormItem>
              <FormLabel>Correlated Tags</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tagId"
          render={({ field }) => (<FormItem>
              <FormLabel>Tag Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tag" />
                  </SelectTrigger>
                  <SelectContent>
                    {tags?.tags.map((tag) => (
                      <SelectItem key={tag.tag.id} value={tag.tag.id.toString()}>
                        {tag.tag.id}  {/* TODO: Replace with a field from the tag model */}
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
            onClick={() => deleteTagCorrelation({ id: tagCorrelation.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default TagCorrelationForm;
