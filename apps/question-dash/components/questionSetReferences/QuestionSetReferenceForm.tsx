"use client";

import { QuestionSetReference, NewQuestionSetReferenceParams, insertQuestionSetReferenceParams } from "@/lib/db/schema/questionSetReferences";
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

const QuestionSetReferenceForm = ({
  questionSetReference,
  closeModal,
}: {
  questionSetReference?: QuestionSetReference;
  closeModal?: () => void;
}) => {
  
  const editing = !!questionSetReference?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuestionSetReferenceParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuestionSetReferenceParams),
    defaultValues: questionSetReference ?? {
      component: "",
     filterCondition: "",
     itemId: "",
     questionArea: "",
     questionsContextId: "",
     usingContextId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.questionSetReferences.getQuestionSetReferences.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Question Set Reference ${action}d!`);
  };

  const { mutate: createQuestionSetReference, isLoading: isCreating } =
    trpc.questionSetReferences.createQuestionSetReference.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuestionSetReference, isLoading: isUpdating } =
    trpc.questionSetReferences.updateQuestionSetReference.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuestionSetReference, isLoading: isDeleting } =
    trpc.questionSetReferences.deleteQuestionSetReference.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuestionSetReferenceParams) => {
    if (editing) {
      updateQuestionSetReference({ ...values, id: questionSetReference.id });
    } else {
      createQuestionSetReference(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
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
          name="filterCondition"
          render={({ field }) => (<FormItem>
              <FormLabel>Filter Condition</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemId"
          render={({ field }) => (<FormItem>
              <FormLabel>Item Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="questionArea"
          render={({ field }) => (<FormItem>
              <FormLabel>Question Area</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="questionsContextId"
          render={({ field }) => (<FormItem>
              <FormLabel>Questions Context Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="usingContextId"
          render={({ field }) => (<FormItem>
              <FormLabel>Using Context Id</FormLabel>
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
            onClick={() => deleteQuestionSetReference({ id: questionSetReference.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuestionSetReferenceForm;
