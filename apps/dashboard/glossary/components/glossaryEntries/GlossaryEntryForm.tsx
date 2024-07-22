"use client";

import { GlossaryEntry, NewGlossaryEntryParams, insertGlossaryEntryParams } from "@soco/glossary-db/schema/glossaryEntries";
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

const GlossaryEntryForm = ({
  glossaryEntry,
  closeModal,
}: {
  glossaryEntry?: GlossaryEntry;
  closeModal?: () => void;
}) => {
  
  const editing = !!glossaryEntry?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertGlossaryEntryParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertGlossaryEntryParams),
    defaultValues: glossaryEntry ?? {
      approved: false,
     attachment: "",
     caseSensitive: false,
     concept: "",
     definition: "",
     definitionTrust: false,
     definitionFormat: 0,
     fullMatch: false,
     glossaryId: "",
     sourceGlossaryId: "",
     teacherEntry: false,
     useDynaLink: false
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.glossaryEntries.getGlossaryEntries.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Glossary Entry ${action}d!`);
  };

  const { mutate: createGlossaryEntry, isLoading: isCreating } =
    trpc.glossaryEntries.createGlossaryEntry.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateGlossaryEntry, isLoading: isUpdating } =
    trpc.glossaryEntries.updateGlossaryEntry.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteGlossaryEntry, isLoading: isDeleting } =
    trpc.glossaryEntries.deleteGlossaryEntry.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewGlossaryEntryParams) => {
    if (editing) {
      updateGlossaryEntry({ ...values, id: glossaryEntry.id });
    } else {
      createGlossaryEntry(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="approved"
          render={({ field }) => (<FormItem>
              <FormLabel>Approved</FormLabel>
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
          name="attachment"
          render={({ field }) => (<FormItem>
              <FormLabel>Attachment</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="caseSensitive"
          render={({ field }) => (<FormItem>
              <FormLabel>Case Sensitive</FormLabel>
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
          name="concept"
          render={({ field }) => (<FormItem>
              <FormLabel>Concept</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="definition"
          render={({ field }) => (<FormItem>
              <FormLabel>Definition</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="definitionTrust"
          render={({ field }) => (<FormItem>
              <FormLabel>Definition Trust</FormLabel>
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
          name="definitionFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Definition Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullMatch"
          render={({ field }) => (<FormItem>
              <FormLabel>Full Match</FormLabel>
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
          name="glossaryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Glossary Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sourceGlossaryId"
          render={({ field }) => (<FormItem>
              <FormLabel>Source Glossary Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teacherEntry"
          render={({ field }) => (<FormItem>
              <FormLabel>Teacher Entry</FormLabel>
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
          name="useDynaLink"
          render={({ field }) => (<FormItem>
              <FormLabel>Use Dyna Link</FormLabel>
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
            onClick={() => deleteGlossaryEntry({ id: glossaryEntry.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default GlossaryEntryForm;
