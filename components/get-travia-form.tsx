"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import CategoriesComboBox from "./categories-combo-box";
import { useFormParams } from "../providers/api-params-store-provider";
import useDialogStore from "@/store/dialog-store";
import { useRouter } from "next/navigation";

const traviaFormSchema = z.object({
  amount: z.preprocess(
    (value) => (value ? Number(value) : undefined),
    z
      .number()
      .min(1, "Please enter at least 1 question.")
      .max(50, "Maximum 50 questions allowed.")
      .optional(),
  ),
  category: z.number().optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  type: z.enum(["multiple", "boolean"]).optional(),
});

export type TraviaFormSchemaType = z.infer<typeof traviaFormSchema>;

const TraviaForm = () => {
  const form = useForm<TraviaFormSchemaType>({
    resolver: zodResolver(traviaFormSchema),
    defaultValues: {
      amount: 10,
      category: undefined,
      difficulty: undefined,
      type: undefined,
    },
  });
  const router = useRouter();

  const onClose = useDialogStore((state) => state.onClose);
  const { setFormParams } = useFormParams((state) => state);

  const onSubmit = (data: TraviaFormSchemaType) => {
    setFormParams(data);
    onClose();
    router.push("/trivias");
    console.log("form ", data);
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center justify-center gap-y-6"
        >
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base font-medium">
                  Number of Questions
                  <span className="pl-2 text-sm text-neutral-500">
                    (Choose between 1 and 50 questions)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="How many questions?"
                    type="number"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    className="rounded-full border border-black bg-[#dee2e6] px-4"
                    value={field.value || 10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-y-2">
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <CategoriesComboBox field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Difficulty</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value === "none" ? undefined : value);
                    }}
                    value={field.value || ""}
                  >
                    <SelectTrigger className="rounded-full border border-black bg-[#dee2e6] px-4">
                      <SelectValue placeholder="Select a difficulty" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectItem value="none">Any</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="">Type of Question</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value === "none" ? undefined : value);
                    }}
                    value={field.value || ""}
                  >
                    <SelectTrigger className="rounded-full border border-black bg-[#dee2e6] px-4">
                      <SelectValue placeholder="Select a difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Any</SelectItem>
                      <SelectItem value="multiple">Multiple choice</SelectItem>
                      <SelectItem value="boolean">True or False</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-4 w-full rounded-full border border-black bg-[#FFB900] text-lg text-black shadow-[4px_4px_0px_#664A00] transition-all duration-300 ease-in-out hover:translate-x-[2px] hover:bg-[] hover:shadow-[2px_2px_0px_#664A00] active:translate-x-[0px] active:shadow-none"
          >
            Generate Quiz
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TraviaForm;
