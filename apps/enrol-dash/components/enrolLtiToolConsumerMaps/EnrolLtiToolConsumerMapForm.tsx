"use client";

import { EnrolLtiToolConsumerMap, NewEnrolLtiToolConsumerMapParams, insertEnrolLtiToolConsumerMapParams } from "@/lib/db/schema/enrolLtiToolConsumerMaps";
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

const EnrolLtiToolConsumerMapForm = ({
  enrolLtiToolConsumerMap,
  closeModal,
}: {
  enrolLtiToolConsumerMap?: EnrolLtiToolConsumerMap;
  closeModal?: () => void;
}) => {
  
  const editing = !!enrolLtiToolConsumerMap?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEnrolLtiToolConsumerMapParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEnrolLtiToolConsumerMapParams),
    defaultValues: enrolLtiToolConsumerMap ?? {
      consumerId: "",
     toolId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.enrolLtiToolConsumerMaps.getEnrolLtiToolConsumerMaps.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Enrol Lti Tool Consumer Map ${action}d!`);
  };

  const { mutate: createEnrolLtiToolConsumerMap, isLoading: isCreating } =
    trpc.enrolLtiToolConsumerMaps.createEnrolLtiToolConsumerMap.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEnrolLtiToolConsumerMap, isLoading: isUpdating } =
    trpc.enrolLtiToolConsumerMaps.updateEnrolLtiToolConsumerMap.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEnrolLtiToolConsumerMap, isLoading: isDeleting } =
    trpc.enrolLtiToolConsumerMaps.deleteEnrolLtiToolConsumerMap.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEnrolLtiToolConsumerMapParams) => {
    if (editing) {
      updateEnrolLtiToolConsumerMap({ ...values, id: enrolLtiToolConsumerMap.id });
    } else {
      createEnrolLtiToolConsumerMap(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="consumerId"
          render={({ field }) => (<FormItem>
              <FormLabel>Consumer Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="toolId"
          render={({ field }) => (<FormItem>
              <FormLabel>Tool Id</FormLabel>
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
            onClick={() => deleteEnrolLtiToolConsumerMap({ id: enrolLtiToolConsumerMap.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EnrolLtiToolConsumerMapForm;
