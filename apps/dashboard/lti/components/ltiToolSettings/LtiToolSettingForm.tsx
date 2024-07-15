"use client";

import { LtiToolSetting, NewLtiToolSettingParams, insertLtiToolSettingParams } from "@soco/lti-db/schema/ltiToolSettings";
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

const LtiToolSettingForm = ({
  ltiToolSetting,
  closeModal,
}: {
  ltiToolSetting?: LtiToolSetting;
  closeModal?: () => void;
}) => {
  
  const editing = !!ltiToolSetting?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertLtiToolSettingParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertLtiToolSettingParams),
    defaultValues: ltiToolSetting ?? {
      course: "",
     courseModuleId: "",
     settings: "",
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

    await utils.ltiToolSettings.getLtiToolSettings.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Lti Tool Setting ${action}d!`);
  };

  const { mutate: createLtiToolSetting, isLoading: isCreating } =
    trpc.ltiToolSettings.createLtiToolSetting.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateLtiToolSetting, isLoading: isUpdating } =
    trpc.ltiToolSettings.updateLtiToolSetting.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteLtiToolSetting, isLoading: isDeleting } =
    trpc.ltiToolSettings.deleteLtiToolSetting.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewLtiToolSettingParams) => {
    if (editing) {
      updateLtiToolSetting({ ...values, id: ltiToolSetting.id });
    } else {
      createLtiToolSetting(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (<FormItem>
              <FormLabel>Course</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseModuleId"
          render={({ field }) => (<FormItem>
              <FormLabel>Course Module Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="settings"
          render={({ field }) => (<FormItem>
              <FormLabel>Settings</FormLabel>
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
            onClick={() => deleteLtiToolSetting({ id: ltiToolSetting.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default LtiToolSettingForm;
