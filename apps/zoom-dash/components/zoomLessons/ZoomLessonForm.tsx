"use client";

import { ZoomLesson, NewZoomLessonParams, insertZoomLessonParams } from "@/lib/db/schema/zoomLessons";
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

const ZoomLessonForm = ({
  zoomLesson,
  closeModal,
}: {
  zoomLesson?: ZoomLesson;
  closeModal?: () => void;
}) => {
  
  const editing = !!zoomLesson?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertZoomLessonParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertZoomLessonParams),
    defaultValues: zoomLesson ?? {
      active: false,
     courseId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.zoomLessons.getZoomLessons.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Zoom Lesson ${action}d!`);
  };

  const { mutate: createZoomLesson, isLoading: isCreating } =
    trpc.zoomLessons.createZoomLesson.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateZoomLesson, isLoading: isUpdating } =
    trpc.zoomLessons.updateZoomLesson.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteZoomLesson, isLoading: isDeleting } =
    trpc.zoomLessons.deleteZoomLesson.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewZoomLessonParams) => {
    if (editing) {
      updateZoomLesson({ ...values, id: zoomLesson.id });
    } else {
      createZoomLesson(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (<FormItem>
              <FormLabel>Active</FormLabel>
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
            onClick={() => deleteZoomLesson({ id: zoomLesson.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ZoomLessonForm;
