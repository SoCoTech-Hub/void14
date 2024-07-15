"use client";

import { EditorAttoAutosave, NewEditorAttoAutosaveParams, insertEditorAttoAutosaveParams } from "@soco/editor-db/schema/editorAttoAutosaves";
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

const EditorAttoAutosaveForm = ({
  editorAttoAutosave,
  closeModal,
}: {
  editorAttoAutosave?: EditorAttoAutosave;
  closeModal?: () => void;
}) => {
  
  const editing = !!editorAttoAutosave?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEditorAttoAutosaveParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEditorAttoAutosaveParams),
    defaultValues: editorAttoAutosave ?? {
      contextId: "",
     draftId: "",
     draftText: "",
     elementId: "",
     pageHash: "",
     pageInstance: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.editorAttoAutosaves.getEditorAttoAutosaves.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Editor Atto Autosave ${action}d!`);
  };

  const { mutate: createEditorAttoAutosave, isLoading: isCreating } =
    trpc.editorAttoAutosaves.createEditorAttoAutosave.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEditorAttoAutosave, isLoading: isUpdating } =
    trpc.editorAttoAutosaves.updateEditorAttoAutosave.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEditorAttoAutosave, isLoading: isDeleting } =
    trpc.editorAttoAutosaves.deleteEditorAttoAutosave.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEditorAttoAutosaveParams) => {
    if (editing) {
      updateEditorAttoAutosave({ ...values, id: editorAttoAutosave.id });
    } else {
      createEditorAttoAutosave(values);
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
          name="draftId"
          render={({ field }) => (<FormItem>
              <FormLabel>Draft Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="draftText"
          render={({ field }) => (<FormItem>
              <FormLabel>Draft Text</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="elementId"
          render={({ field }) => (<FormItem>
              <FormLabel>Element Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pageHash"
          render={({ field }) => (<FormItem>
              <FormLabel>Page Hash</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pageInstance"
          render={({ field }) => (<FormItem>
              <FormLabel>Page Instance</FormLabel>
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
            onClick={() => deleteEditorAttoAutosave({ id: editorAttoAutosave.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EditorAttoAutosaveForm;
