"use client";

import { QtypeEssayOption, NewQtypeEssayOptionParams, insertQtypeEssayOptionParams } from "@soco/qtype-db/schema/qtypeEssayOptions";
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

const QtypeEssayOptionForm = ({
  qtypeEssayOption,
  closeModal,
}: {
  qtypeEssayOption?: QtypeEssayOption;
  closeModal?: () => void;
}) => {
  
  const editing = !!qtypeEssayOption?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQtypeEssayOptionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQtypeEssayOptionParams),
    defaultValues: qtypeEssayOption ?? {
      attachments: 0,
     attachmentsRequired: 0,
     fileTypesList: "",
     graderInfo: "",
     graderInfoFormat: 0,
     maxBytes: 0,
     maxWordLimit: 0,
     minWordLimit: 0,
     questionId: "",
     responseFieldLines: 0,
     responseFormat: "",
     responseRequired: false,
     responseTemplate: "",
     responseTemplateFormat: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.qtypeEssayOptions.getQtypeEssayOptions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Qtype Essay Option ${action}d!`);
  };

  const { mutate: createQtypeEssayOption, isLoading: isCreating } =
    trpc.qtypeEssayOptions.createQtypeEssayOption.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQtypeEssayOption, isLoading: isUpdating } =
    trpc.qtypeEssayOptions.updateQtypeEssayOption.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQtypeEssayOption, isLoading: isDeleting } =
    trpc.qtypeEssayOptions.deleteQtypeEssayOption.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQtypeEssayOptionParams) => {
    if (editing) {
      updateQtypeEssayOption({ ...values, id: qtypeEssayOption.id });
    } else {
      createQtypeEssayOption(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="attachments"
          render={({ field }) => (<FormItem>
              <FormLabel>Attachments</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attachmentsRequired"
          render={({ field }) => (<FormItem>
              <FormLabel>Attachments Required</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fileTypesList"
          render={({ field }) => (<FormItem>
              <FormLabel>File Types List</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="graderInfo"
          render={({ field }) => (<FormItem>
              <FormLabel>Grader Info</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="graderInfoFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Grader Info Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxBytes"
          render={({ field }) => (<FormItem>
              <FormLabel>Max Bytes</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxWordLimit"
          render={({ field }) => (<FormItem>
              <FormLabel>Max Word Limit</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minWordLimit"
          render={({ field }) => (<FormItem>
              <FormLabel>Min Word Limit</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="questionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responseFieldLines"
          render={({ field }) => (<FormItem>
              <FormLabel>Response Field Lines</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responseFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Response Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responseRequired"
          render={({ field }) => (<FormItem>
              <FormLabel>Response Required</FormLabel>
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
          name="responseTemplate"
          render={({ field }) => (<FormItem>
              <FormLabel>Response Template</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responseTemplateFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Response Template Format</FormLabel>
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
            onClick={() => deleteQtypeEssayOption({ id: qtypeEssayOption.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QtypeEssayOptionForm;
