"use client";

import { TagArea, NewTagAreaParams, insertTagAreaParams } from "@/lib/db/schema/tagAreas";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const TagAreaForm = ({
  tagArea,
  closeModal,
}: {
  tagArea?: TagArea;
  closeModal?: () => void;
}) => {
  const { data: tagColls } = trpc.tagColls.getTagColls.useQuery();
  const editing = !!tagArea?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertTagAreaParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertTagAreaParams),
    defaultValues: tagArea ?? {
      callback: "",
     callbackFile: "",
     component: "",
     enabled: false,
     itemType: "",
     multipleContexts: false,
     showStandard: false,
     tagCollId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.tagAreas.getTagAreas.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Tag Area ${action}d!`);
  };

  const { mutate: createTagArea, isLoading: isCreating } =
    trpc.tagAreas.createTagArea.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateTagArea, isLoading: isUpdating } =
    trpc.tagAreas.updateTagArea.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteTagArea, isLoading: isDeleting } =
    trpc.tagAreas.deleteTagArea.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewTagAreaParams) => {
    if (editing) {
      updateTagArea({ ...values, id: tagArea.id });
    } else {
      createTagArea(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="callback"
          render={({ field }) => (<FormItem>
              <FormLabel>Callback</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="callbackFile"
          render={({ field }) => (<FormItem>
              <FormLabel>Callback File</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="component"
          render={({ field }) => (<FormItem>
              <FormLabel>Component</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enabled"
          render={({ field }) => (<FormItem>
              <FormLabel>Enabled</FormLabel>
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
          name="itemType"
          render={({ field }) => (<FormItem>
              <FormLabel>Item Type</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="multipleContexts"
          render={({ field }) => (<FormItem>
              <FormLabel>Multiple Contexts</FormLabel>
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
          name="showStandard"
          render={({ field }) => (<FormItem>
              <FormLabel>Show Standard</FormLabel>
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
          name="tagCollId"
          render={({ field }) => (<FormItem>
              <FormLabel>Tag Coll Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tag coll" />
                  </SelectTrigger>
                  <SelectContent>
                    {tagColls?.tagColls.map((tagColl) => (
                      <SelectItem key={tagColl.id} value={tagColl.id.toString()}>
                        {tagColl.id}  {/* TODO: Replace with a field from the tagColl model */}
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
            onClick={() => deleteTagArea({ id: tagArea.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default TagAreaForm;
