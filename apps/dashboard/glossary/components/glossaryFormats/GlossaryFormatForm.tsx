"use client";

import { GlossaryFormat, NewGlossaryFormatParams, insertGlossaryFormatParams } from "@/lib/db/schema/glossaryFormats";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const GlossaryFormatForm = ({
  glossaryFormat,
  closeModal,
}: {
  glossaryFormat?: GlossaryFormat;
  closeModal?: () => void;
}) => {
  
  const editing = !!glossaryFormat?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGlossaryFormatParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGlossaryFormatParams),
    defaultValues: glossaryFormat ?? {
      defaultHook: "",
     defaultMode: "",
     name: "",
     popUpFormatName: "",
     showGroup: false,
     visible: false,
     showTabs: "",
     sortKey: "",
     sortOrder: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.glossaryFormats.getGlossaryFormats.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Glossary Format ${action}d!`);
  };

  const { mutate: createGlossaryFormat, isLoading: isCreating } =
    trpc.glossaryFormats.createGlossaryFormat.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGlossaryFormat, isLoading: isUpdating } =
    trpc.glossaryFormats.updateGlossaryFormat.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGlossaryFormat, isLoading: isDeleting } =
    trpc.glossaryFormats.deleteGlossaryFormat.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGlossaryFormatParams) => {
    if (editing) {
      updateGlossaryFormat({ ...values, id: glossaryFormat.id });
    } else {
      createGlossaryFormat(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="defaultHook"
          render={({ field }) => (<FormItem>
              <FormLabel>Default Hook</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="defaultMode"
          render={({ field }) => (<FormItem>
              <FormLabel>Default Mode</FormLabel>
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
        <FormField
          control={form.control}
          name="popUpFormatName"
          render={({ field }) => (<FormItem>
              <FormLabel>Pop Up Format Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="showGroup"
          render={({ field }) => (<FormItem>
              <FormLabel>Show Group</FormLabel>
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
          name="visible"
          render={({ field }) => (<FormItem>
              <FormLabel>Visible</FormLabel>
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
          name="showTabs"
          render={({ field }) => (<FormItem>
              <FormLabel>Show Tabs</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sortKey"
          render={({ field }) => (<FormItem>
              <FormLabel>Sort Key</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sortOrder"
          render={({ field }) => (<FormItem>
              <FormLabel>Sort Order</FormLabel>
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
            onClick={() => deleteGlossaryFormat({ id: glossaryFormat.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GlossaryFormatForm;
