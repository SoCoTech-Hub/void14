"use client";

import { QuizaccessSebTemplate, NewQuizaccessSebTemplateParams, insertQuizaccessSebTemplateParams } from "@soco/quizaccess-db/schema/quizaccessSebTemplates";
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

const QuizaccessSebTemplateForm = ({
  quizaccessSebTemplate,
  closeModal,
}: {
  quizaccessSebTemplate?: QuizaccessSebTemplate;
  closeModal?: () => void;
}) => {
  
  const editing = !!quizaccessSebTemplate?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuizaccessSebTemplateParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuizaccessSebTemplateParams),
    defaultValues: quizaccessSebTemplate ?? {
      content: "",
     description: "",
     enabled: false,
     name: "",
     sortOrder: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.quizaccessSebTemplates.getQuizaccessSebTemplates.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Quizaccess Seb Template ${action}d!`);
  };

  const { mutate: createQuizaccessSebTemplate, isLoading: isCreating } =
    trpc.quizaccessSebTemplates.createQuizaccessSebTemplate.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuizaccessSebTemplate, isLoading: isUpdating } =
    trpc.quizaccessSebTemplates.updateQuizaccessSebTemplate.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuizaccessSebTemplate, isLoading: isDeleting } =
    trpc.quizaccessSebTemplates.deleteQuizaccessSebTemplate.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuizaccessSebTemplateParams) => {
    if (editing) {
      updateQuizaccessSebTemplate({ ...values, id: quizaccessSebTemplate.id });
    } else {
      createQuizaccessSebTemplate(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (<FormItem>
              <FormLabel>Content</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (<FormItem>
              <FormLabel>Description</FormLabel>
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
            onClick={() => deleteQuizaccessSebTemplate({ id: quizaccessSebTemplate.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuizaccessSebTemplateForm;
