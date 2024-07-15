"use client";

import { EnrolLtiTool, NewEnrolLtiToolParams, insertEnrolLtiToolParams } from "@soco/enrol-db/schema/enrolLtiTools";
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

const EnrolLtiToolForm = ({
  enrolLtiTool,
  closeModal,
}: {
  enrolLtiTool?: EnrolLtiTool;
  closeModal?: () => void;
}) => {
  
  const editing = !!enrolLtiTool?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertEnrolLtiToolParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertEnrolLtiToolParams),
    defaultValues: enrolLtiTool ?? {
      city: "",
     contextId: "",
     country: "",
     enrolId: "",
     gradeSync: false,
     gradeSyncCompletion: false,
     institution: "",
     lang: "",
     ltiVersion: "",
     mailDisplay: 0,
     maxEnrolled: 0,
     memberSync: false,
     memberSyncMode: false,
     provisioningModeInstructor: 0,
     provisioningModeLearner: 0,
     roleInstructor: "",
     roleLearner: "",
     secret: "",
     timeZone: "",
     uuid: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.enrolLtiTools.getEnrolLtiTools.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Enrol Lti Tool ${action}d!`);
  };

  const { mutate: createEnrolLtiTool, isLoading: isCreating } =
    trpc.enrolLtiTools.createEnrolLtiTool.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateEnrolLtiTool, isLoading: isUpdating } =
    trpc.enrolLtiTools.updateEnrolLtiTool.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteEnrolLtiTool, isLoading: isDeleting } =
    trpc.enrolLtiTools.deleteEnrolLtiTool.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewEnrolLtiToolParams) => {
    if (editing) {
      updateEnrolLtiTool({ ...values, id: enrolLtiTool.id });
    } else {
      createEnrolLtiTool(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (<FormItem>
              <FormLabel>City</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
          name="country"
          render={({ field }) => (<FormItem>
              <FormLabel>Country</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enrolId"
          render={({ field }) => (<FormItem>
              <FormLabel>Enrol Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gradeSync"
          render={({ field }) => (<FormItem>
              <FormLabel>Grade Sync</FormLabel>
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
          name="gradeSyncCompletion"
          render={({ field }) => (<FormItem>
              <FormLabel>Grade Sync Completion</FormLabel>
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
          name="institution"
          render={({ field }) => (<FormItem>
              <FormLabel>Institution</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lang"
          render={({ field }) => (<FormItem>
              <FormLabel>Lang</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ltiVersion"
          render={({ field }) => (<FormItem>
              <FormLabel>Lti Version</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mailDisplay"
          render={({ field }) => (<FormItem>
              <FormLabel>Mail Display</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxEnrolled"
          render={({ field }) => (<FormItem>
              <FormLabel>Max Enrolled</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="memberSync"
          render={({ field }) => (<FormItem>
              <FormLabel>Member Sync</FormLabel>
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
          name="memberSyncMode"
          render={({ field }) => (<FormItem>
              <FormLabel>Member Sync Mode</FormLabel>
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
          name="provisioningModeInstructor"
          render={({ field }) => (<FormItem>
              <FormLabel>Provisioning Mode Instructor</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="provisioningModeLearner"
          render={({ field }) => (<FormItem>
              <FormLabel>Provisioning Mode Learner</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roleInstructor"
          render={({ field }) => (<FormItem>
              <FormLabel>Role Instructor</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roleLearner"
          render={({ field }) => (<FormItem>
              <FormLabel>Role Learner</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="secret"
          render={({ field }) => (<FormItem>
              <FormLabel>Secret</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeZone"
          render={({ field }) => (<FormItem>
              <FormLabel>Time Zone</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="uuid"
          render={({ field }) => (<FormItem>
              <FormLabel>Uuid</FormLabel>
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
            onClick={() => deleteEnrolLtiTool({ id: enrolLtiTool.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default EnrolLtiToolForm;
