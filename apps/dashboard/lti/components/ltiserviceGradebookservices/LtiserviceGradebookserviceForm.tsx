"use client";

import { LtiserviceGradebookservice, NewLtiserviceGradebookserviceParams, insertLtiserviceGradebookserviceParams } from "@soco/lti-db/schema/ltiserviceGradebookservices";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LtiserviceGradebookserviceForm = ({
  ltiserviceGradebookservice,
  closeModal,
}: {
  ltiserviceGradebookservice?: LtiserviceGradebookservice;
  closeModal?: () => void;
}) => {
  
  const editing = !!ltiserviceGradebookservice?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertLtiserviceGradebookserviceParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertLtiserviceGradebookserviceParams),
    defaultValues: ltiserviceGradebookservice ?? {
      baseUrl: "",
     courseId: "",
     gradeItemId: "",
     ltiLinkId: "",
     resourceId: "",
     tag: "",
     toolProxyId: "",
     typeId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.ltiserviceGradebookservices.getLtiserviceGradebookservices.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Ltiservice Gradebookservice ${action}d!`);
  };

  const { mutate: createLtiserviceGradebookservice, isLoading: isCreating } =
    trpc.ltiserviceGradebookservices.createLtiserviceGradebookservice.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateLtiserviceGradebookservice, isLoading: isUpdating } =
    trpc.ltiserviceGradebookservices.updateLtiserviceGradebookservice.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteLtiserviceGradebookservice, isLoading: isDeleting } =
    trpc.ltiserviceGradebookservices.deleteLtiserviceGradebookservice.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewLtiserviceGradebookserviceParams) => {
    if (editing) {
      updateLtiserviceGradebookservice({ ...values, id: ltiserviceGradebookservice.id });
    } else {
      createLtiserviceGradebookservice(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="baseUrl"
          render={({ field }) => (<FormItem>
              <FormLabel>Base Url</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (<FormItem>
              <FormLabel>Course Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gradeItemId"
          render={({ field }) => (<FormItem>
              <FormLabel>Grade Item Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ltiLinkId"
          render={({ field }) => (<FormItem>
              <FormLabel>Lti Link Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resourceId"
          render={({ field }) => (<FormItem>
              <FormLabel>Resource Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (<FormItem>
              <FormLabel>Tag</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="toolProxyId"
          render={({ field }) => (<FormItem>
              <FormLabel>Tool Proxy Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="typeId"
          render={({ field }) => (<FormItem>
              <FormLabel>Type Id</FormLabel>
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
            onClick={() => deleteLtiserviceGradebookservice({ id: ltiserviceGradebookservice.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default LtiserviceGradebookserviceForm;
