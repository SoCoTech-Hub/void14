"use client";

import { H5pactivityAttempt, NewH5pactivityAttemptParams, insertH5pactivityAttemptParams } from "@/lib/db/schema/h5pactivityAttempts";
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

const H5pactivityAttemptForm = ({
  h5pactivityAttempt,
  closeModal,
}: {
  h5pactivityAttempt?: H5pactivityAttempt;
  closeModal?: () => void;
}) => {
  
  const editing = !!h5pactivityAttempt?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertH5pactivityAttemptParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertH5pactivityAttemptParams),
    defaultValues: h5pactivityAttempt ?? {
      attempt: 0,
     completion: false,
     duration: 0,
     h5pActivityId: "",
     maxScore: 0,
     rawScore: 0,
     scaled: 0.0,
     success: false
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.h5pactivityAttempts.getH5pactivityAttempts.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`H5pactivity Attempt ${action}d!`);
  };

  const { mutate: createH5pactivityAttempt, isLoading: isCreating } =
    trpc.h5pactivityAttempts.createH5pactivityAttempt.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateH5pactivityAttempt, isLoading: isUpdating } =
    trpc.h5pactivityAttempts.updateH5pactivityAttempt.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteH5pactivityAttempt, isLoading: isDeleting } =
    trpc.h5pactivityAttempts.deleteH5pactivityAttempt.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewH5pactivityAttemptParams) => {
    if (editing) {
      updateH5pactivityAttempt({ ...values, id: h5pactivityAttempt.id });
    } else {
      createH5pactivityAttempt(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="attempt"
          render={({ field }) => (<FormItem>
              <FormLabel>Attempt</FormLabel>
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
          name="h5pActivityId"
          render={({ field }) => (<FormItem>
              <FormLabel>H5p Activity Id</FormLabel>
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
          name="scaled"
          render={({ field }) => (<FormItem>
              <FormLabel>Scaled</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="success"
          render={({ field }) => (<FormItem>
              <FormLabel>Success</FormLabel>
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
            onClick={() => deleteH5pactivityAttempt({ id: h5pactivityAttempt.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default H5pactivityAttemptForm;
