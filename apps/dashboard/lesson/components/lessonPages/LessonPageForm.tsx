"use client";

import { LessonPage, NewLessonPageParams, insertLessonPageParams } from "@soco/lesson-db/schema/lessonPages";
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

const LessonPageForm = ({
  lessonPage,
  closeModal,
}: {
  lessonPage?: LessonPage;
  closeModal?: () => void;
}) => {
  
  const editing = !!lessonPage?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertLessonPageParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertLessonPageParams),
    defaultValues: lessonPage ?? {
      contents: "",
     contentsFormat: 0,
     display: 0,
     layout: 0,
     lessonId: "",
     nextPageId: "",
     prevPageId: "",
     qOption: 0,
     qType: 0,
     title: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.lessonPages.getLessonPages.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Lesson Page ${action}d!`);
  };

  const { mutate: createLessonPage, isLoading: isCreating } =
    trpc.lessonPages.createLessonPage.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateLessonPage, isLoading: isUpdating } =
    trpc.lessonPages.updateLessonPage.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteLessonPage, isLoading: isDeleting } =
    trpc.lessonPages.deleteLessonPage.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewLessonPageParams) => {
    if (editing) {
      updateLessonPage({ ...values, id: lessonPage.id });
    } else {
      createLessonPage(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="contents"
          render={({ field }) => (<FormItem>
              <FormLabel>Contents</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contentsFormat"
          render={({ field }) => (<FormItem>
              <FormLabel>Contents Format</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="display"
          render={({ field }) => (<FormItem>
              <FormLabel>Display</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="layout"
          render={({ field }) => (<FormItem>
              <FormLabel>Layout</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lessonId"
          render={({ field }) => (<FormItem>
              <FormLabel>Lesson Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nextPageId"
          render={({ field }) => (<FormItem>
              <FormLabel>Next Page Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prevPageId"
          render={({ field }) => (<FormItem>
              <FormLabel>Prev Page Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="qOption"
          render={({ field }) => (<FormItem>
              <FormLabel>Q Option</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="qType"
          render={({ field }) => (<FormItem>
              <FormLabel>Q Type</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (<FormItem>
              <FormLabel>Title</FormLabel>
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
            onClick={() => deleteLessonPage({ id: lessonPage.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default LessonPageForm;
