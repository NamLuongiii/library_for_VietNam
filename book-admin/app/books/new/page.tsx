"use client";
import { InputContainer } from "@/components/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface IBookNewProps {}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function BookNew(props: IBookNewProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <InputContainer inputType="text" name="name" control={form.control} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
