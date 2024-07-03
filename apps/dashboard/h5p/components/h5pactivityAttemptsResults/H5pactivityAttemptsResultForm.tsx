"use client";

import { H5pactivityAttemptsResult, NewH5pactivityAttemptsResultParams, insertH5pactivityAttemptsResultParams } from "@/lib/db/schema/h5pactivityAttemptsResults";
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

const H5pactivityAttemptsResultForm = ({
  h5pactivityAttemptsResult,
  closeModal,
}: {
  h5pactivityAttemptsResult?: H5pactivityAttemptsResult;
  closeModal?: () => void;
}) => {
  
  const editing = !!h5pactivityAttemptsResult?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertH5pactivityAttemptsResultParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertH5pactivityAttemptsResultParams),
    defaultValues: h5pactivityAttemptsResult ?? {
      additionals: "",
     attemptId: "",
     completion: false,
     correctPattern: "",
     description: "",
     duration: 0,
     interactionType: "",
     maxScore: 0,
     rawScore: 0,
     response: "",
     subContent: "",
     subContent: false
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.h5pactivityAttemptsResults.getH5pactivityAttemptsResults.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`H5pactivity Attempts Result ${action}d!`);
  };

  const { mutate: createH5pactivityAttemptsResult, isLoading: isCreating } =
    trpc.h5pactivityAttemptsResults.createH5pactivityAttemptsResult.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateH5pactivityAttemptsResult, isLoading: isUpdating } =
    trpc.h5pactivityAttemptsResults.updateH5pactivityAttemptsResult.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteH5pactivityAttemptsResult, isLoading: isDeleting } =
    trpc.h5pactivityAttemptsResults.deleteH5pactivityAttemptsResult.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewH5pactivityAttemptsResultParams) => {
    if (editing) {
      updateH5pactivityAttemptsResult({ ...values, id: h5pactivityAttemptsResult.id });
    } else {
      createH5pactivityAttemptsResult(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="additionals"
          render={({ field }) => (<FormItem>
              <FormLabel>Additionals</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attemptId"
          render={({ field }) => (<FormItem>
              <FormLabel>Attempt Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="completion"
          render={({ field }) => (<FormItem>
              <FormLabel>Completion</FormLabel>
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
          name="correctPattern"
          render={({ field }) => (<FormItem>
              <FormLabel>Correct Pattern</FormLabel>
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
          name="duration"
          render={({ field }) => (<FormItem>
              <FormLabel>Duration</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interactionType"
          render={({ field }) => (<FormItem>
              <FormLabel>Interaction Type</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxScore"
          render={({ field }) => (<FormItem>
              <FormLabel>Max Score</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rawScore"
          render={({ field }) => (<FormItem>
              <FormLabel>Raw Score</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="response"
          render={({ field }) => (<FormItem>
              <FormLabel>Response</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subContent"
          render={({ field }) => (<FormItem>
              <FormLabel>Sub Content</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subContent"
          render={({ field }) => (<FormItem>
              <FormLabel>Sub Content</FormLabel>
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
            onClick={() => deleteH5pactivityAttemptsResult({ id: h5pactivityAttemptsResult.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default H5pactivityAttemptsResultForm;
