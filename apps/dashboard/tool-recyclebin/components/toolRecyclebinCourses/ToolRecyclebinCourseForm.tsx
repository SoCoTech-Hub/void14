"use client";

import { ToolRecyclebinCourse, NewToolRecyclebinCourseParams, insertToolRecyclebinCourseParams } from "@/lib/db/schema/toolRecyclebinCourses";
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

const ToolRecyclebinCourseForm = ({
  toolRecyclebinCourse,
  closeModal,
}: {
  toolRecyclebinCourse?: ToolRecyclebinCourse;
  closeModal?: () => void;
}) => {
  
  const editing = !!toolRecyclebinCourse?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertToolRecyclebinCourseParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertToolRecyclebinCourseParams),
    defaultValues: toolRecyclebinCourse ?? {
      courseId: "",
     moduleId: "",
     name: "",
     sectionId: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.toolRecyclebinCourses.getToolRecyclebinCourses.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Tool Recyclebin Course ${action}d!`);
  };

  const { mutate: createToolRecyclebinCourse, isLoading: isCreating } =
    trpc.toolRecyclebinCourses.createToolRecyclebinCourse.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateToolRecyclebinCourse, isLoading: isUpdating } =
    trpc.toolRecyclebinCourses.updateToolRecyclebinCourse.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteToolRecyclebinCourse, isLoading: isDeleting } =
    trpc.toolRecyclebinCourses.deleteToolRecyclebinCourse.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewToolRecyclebinCourseParams) => {
    if (editing) {
      updateToolRecyclebinCourse({ ...values, id: toolRecyclebinCourse.id });
    } else {
      createToolRecyclebinCourse(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
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
          name="moduleId"
          render={({ field }) => (<FormItem>
              <FormLabel>Module Id</FormLabel>
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
          name="sectionId"
          render={({ field }) => (<FormItem>
              <FormLabel>Section Id</FormLabel>
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
            onClick={() => deleteToolRecyclebinCourse({ id: toolRecyclebinCourse.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default ToolRecyclebinCourseForm;
