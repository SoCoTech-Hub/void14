"use client";

import { LessonBranch, NewLessonBranchParams, insertLessonBranchParams } from "@/lib/db/schema/lessonBranches";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LessonBranchForm = ({
  lessonBranch,
  closeModal,
}: {
  lessonBranch?: LessonBranch;
  closeModal?: () => void;
}) => {
  const { data: lessons } = trpc.lessons.getLessons.useQuery();
  const { data: lessonPages } = trpc.lessonPages.getLessonPages.useQuery();
  const editing = !!lessonBranch?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertLessonBranchParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertLessonBranchParams),
    defaultValues: lessonBranch ?? {
      flag: 0,
     lessonId: "",
     lessonPageId: "",
     nextPageId: "",
     retry: 0,
     timeSeen: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.lessonBranches.getLessonBranches.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Lesson Branch ${action}d!`);
  };

  const { mutate: createLessonBranch, isLoading: isCreating } =
    trpc.lessonBranches.createLessonBranch.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateLessonBranch, isLoading: isUpdating } =
    trpc.lessonBranches.updateLessonBranch.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteLessonBranch, isLoading: isDeleting } =
    trpc.lessonBranches.deleteLessonBranch.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewLessonBranchParams) => {
    if (editing) {
      updateLessonBranch({ ...values, id: lessonBranch.id });
    } else {
      createLessonBranch(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="flag"
          render={({ field }) => (<FormItem>
              <FormLabel>Flag</FormLabel>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a lesson" />
                  </SelectTrigger>
                  <SelectContent>
                    {lessons?.lessons.map((lesson) => (
                      <SelectItem key={lesson.id} value={lesson.id.toString()}>
                        {lesson.id}  {/* TODO: Replace with a field from the lesson model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lessonPageId"
          render={({ field }) => (<FormItem>
              <FormLabel>Lesson Page Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a lesson page" />
                  </SelectTrigger>
                  <SelectContent>
                    {lessonPages?.lessonPages.map((lessonPage) => (
                      <SelectItem key={lessonPage.id} value={lessonPage.id.toString()}>
                        {lessonPage.id}  {/* TODO: Replace with a field from the lessonPage model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          name="retry"
          render={({ field }) => (<FormItem>
              <FormLabel>Retry</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeSeen"
          render={({ field }) => (<FormItem>
              <FormLabel>Time Seen</FormLabel>
                <br />
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

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
            onClick={() => deleteLessonBranch({ id: lessonBranch.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default LessonBranchForm;
