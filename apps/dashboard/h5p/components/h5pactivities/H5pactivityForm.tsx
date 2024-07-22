"use client";

import { H5pactivity, NewH5pactivityParams, insertH5pactivityParams } from "@soco/h5p-db/schema/h5pactivities";
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

const H5pactivityForm = ({
  h5pactivity,
  closeModal,
}: {
  h5pactivity?: H5pactivity;
  closeModal?: () => void;
}) => {
  
  const editing = !!h5pactivity?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertH5pactivityParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertH5pactivityParams),
    defaultValues: h5pactivity ?? {
      course: "",
     displayOptions: 0,
     enableTracking: false,
     grade: 0,
     gradeMethod: 0,
     intro: "",
     introFormat: 0,
     name: "",
     reviewMode: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.h5pactivities.getH5pactivities.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`H5pactivity ${action}d!`);
  };

  const { mutate: createH5pactivity, isLoading: isCreating } =
    trpc.h5pactivities.createH5pactivity.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateH5pactivity, isLoading: isUpdating } =
    trpc.h5pactivities.updateH5pactivity.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteH5pactivity, isLoading: isDeleting } =
    trpc.h5pactivities.deleteH5pactivity.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewH5pactivityParams) => {
    if (editing) {
      updateH5pactivity({ ...values, id: h5pactivity.id });
    } else {
      createH5pactivity(values);
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
          name="displayOptions"
          render={({ field }) => (<FormItem>
              <FormLabel>Display Options</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enableTracking"
          render={({ field }) => (<FormItem>
              <FormLabel>Enable Tracking</FormLabel>
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
          name="grade"
          render={({ field }) => (<FormItem>
              <FormLabel>Grade</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gradeMethod"
          render={({ field }) => (<FormItem>
              <FormLabel>Grade Method</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="intro"
          render={({ field }) => (<FormItem>
              <FormLabel>Intro</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="introFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Intro Format</FormLabel>
                <FormControl>
            <Input {...field} />
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
          name="reviewMode"
          render={({ field }) => (<FormItem>
              <FormLabel>Review Mode</FormLabel>
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
            onClick={() => deleteH5pactivity({ id: h5pactivity.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default H5pactivityForm;
