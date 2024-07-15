"use client";

import { QuizaccessSebQuizSetting, NewQuizaccessSebQuizSettingParams, insertQuizaccessSebQuizSettingParams } from "@soco/quizaccess-db/schema/quizaccessSebQuizSettings";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const QuizaccessSebQuizSettingForm = ({
  quizaccessSebQuizSetting,
  closeModal,
}: {
  quizaccessSebQuizSetting?: QuizaccessSebQuizSetting;
  closeModal?: () => void;
}) => {
  const { data: quizaccessSebTemplates } = trpc.quizaccessSebTemplates.getQuizaccessSebTemplates.useQuery();
  const editing = !!quizaccessSebQuizSetting?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertQuizaccessSebQuizSettingParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertQuizaccessSebQuizSettingParams),
    defaultValues: quizaccessSebQuizSetting ?? {
      activateUrlFiltering: false,
     allowedBrowserExamKeys: "",
     allowReloadInExam: false,
     allowSpellChecking: false,
     allowUserQuitSeb: false,
     cmId: "",
     enableAudioControl: false,
     expressionsAllowed: "",
     expressionsBlocked: "",
     filterEmbeddedContent: false,
     linkQuitseb: "",
     muteOnStartup: false,
     quitPassword: "",
     del: 0,
     quizId: "",
     regexAllowed: "",
     regexBlocked: "",
     requireSafeExamBrowser: false,
     showKeyboardLayout: false,
     showReloadButton: false,
     showSebDownloadLink: false,
     showSebTaskbar: false,
     showTime: false,
     showWifiControl: false,
     quizaccessSebTemplateId: "",
     userConfirmQuit: false
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.quizaccessSebQuizSettings.getQuizaccessSebQuizSettings.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Quizaccess Seb Quiz Setting ${action}d!`);
  };

  const { mutate: createQuizaccessSebQuizSetting, isLoading: isCreating } =
    trpc.quizaccessSebQuizSettings.createQuizaccessSebQuizSetting.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateQuizaccessSebQuizSetting, isLoading: isUpdating } =
    trpc.quizaccessSebQuizSettings.updateQuizaccessSebQuizSetting.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteQuizaccessSebQuizSetting, isLoading: isDeleting } =
    trpc.quizaccessSebQuizSettings.deleteQuizaccessSebQuizSetting.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewQuizaccessSebQuizSettingParams) => {
    if (editing) {
      updateQuizaccessSebQuizSetting({ ...values, id: quizaccessSebQuizSetting.id });
    } else {
      createQuizaccessSebQuizSetting(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="activateUrlFiltering"
          render={({ field }) => (<FormItem>
              <FormLabel>Activate Url Filtering</FormLabel>
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
          name="allowedBrowserExamKeys"
          render={({ field }) => (<FormItem>
              <FormLabel>Allowed Browser Exam Keys</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allowReloadInExam"
          render={({ field }) => (<FormItem>
              <FormLabel>Allow Reload In Exam</FormLabel>
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
          name="allowSpellChecking"
          render={({ field }) => (<FormItem>
              <FormLabel>Allow Spell Checking</FormLabel>
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
          name="allowUserQuitSeb"
          render={({ field }) => (<FormItem>
              <FormLabel>Allow User Quit Seb</FormLabel>
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
          name="cmId"
          render={({ field }) => (<FormItem>
              <FormLabel>Cm Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enableAudioControl"
          render={({ field }) => (<FormItem>
              <FormLabel>Enable Audio Control</FormLabel>
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
          name="expressionsAllowed"
          render={({ field }) => (<FormItem>
              <FormLabel>Expressions Allowed</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expressionsBlocked"
          render={({ field }) => (<FormItem>
              <FormLabel>Expressions Blocked</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="filterEmbeddedContent"
          render={({ field }) => (<FormItem>
              <FormLabel>Filter Embedded Content</FormLabel>
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
          name="linkQuitseb"
          render={({ field }) => (<FormItem>
              <FormLabel>Link Quitseb</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="muteOnStartup"
          render={({ field }) => (<FormItem>
              <FormLabel>Mute On Startup</FormLabel>
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
          name="quitPassword"
          render={({ field }) => (<FormItem>
              <FormLabel>Quit Password</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="del"
          render={({ field }) => (<FormItem>
              <FormLabel>Del</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quizId"
          render={({ field }) => (<FormItem>
              <FormLabel>Quiz Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="regexAllowed"
          render={({ field }) => (<FormItem>
              <FormLabel>Regex Allowed</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="regexBlocked"
          render={({ field }) => (<FormItem>
              <FormLabel>Regex Blocked</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requireSafeExamBrowser"
          render={({ field }) => (<FormItem>
              <FormLabel>Require Safe Exam Browser</FormLabel>
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
          name="showKeyboardLayout"
          render={({ field }) => (<FormItem>
              <FormLabel>Show Keyboard Layout</FormLabel>
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
          name="showReloadButton"
          render={({ field }) => (<FormItem>
              <FormLabel>Show Reload Button</FormLabel>
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
          name="showSebDownloadLink"
          render={({ field }) => (<FormItem>
              <FormLabel>Show Seb Download Link</FormLabel>
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
          name="showSebTaskbar"
          render={({ field }) => (<FormItem>
              <FormLabel>Show Seb Taskbar</FormLabel>
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
          name="showTime"
          render={({ field }) => (<FormItem>
              <FormLabel>Show Time</FormLabel>
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
          name="showWifiControl"
          render={({ field }) => (<FormItem>
              <FormLabel>Show Wifi Control</FormLabel>
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
          name="quizaccessSebTemplateId"
          render={({ field }) => (<FormItem>
              <FormLabel>Quizaccess Seb Template Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a quizaccess seb template" />
                  </SelectTrigger>
                  <SelectContent>
                    {quizaccessSebTemplates?.quizaccessSebTemplates.map((quizaccessSebTemplate) => (
                      <SelectItem key={quizaccessSebTemplate.id} value={quizaccessSebTemplate.id.toString()}>
                        {quizaccessSebTemplate.id}  {/* TODO: Replace with a field from the quizaccessSebTemplate model */}
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
          name="userConfirmQuit"
          render={({ field }) => (<FormItem>
              <FormLabel>User Confirm Quit</FormLabel>
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
            onClick={() => deleteQuizaccessSebQuizSetting({ id: quizaccessSebQuizSetting.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default QuizaccessSebQuizSettingForm;
