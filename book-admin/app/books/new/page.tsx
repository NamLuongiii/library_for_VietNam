"use client";
import { InputContainer } from "@/components/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface IBookNewProps {}

const FormSchema = z.object({
  name: z.string().min(5, {
    message: "Tên sách tối thiểu 5 kí tự",
  }),
  page: z.number().min(0).max(1000),
  chapter: z.number().min(0).max(1000),
  preface: z.string(),
  cover: z.instanceof(File),
  authors: z.any(),
});

export default function BookNew(props: IBookNewProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      page: 0,
      chapter: 0,
      preface: "",
      cover: undefined,
      authors: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <InputContainer
          label="Tên sách"
          inputType="text"
          name="name"
          control={form.control}
        />
        <InputContainer
          label="Số trang sách"
          inputType="number"
          name="page"
          control={form.control}
        />
        <InputContainer
          label="Số chương"
          inputType="number"
          name="chapter"
          control={form.control}
        />
        <InputContainer
          label="Mô tả sách"
          inputType="richText"
          name="preface"
          control={form.control}
        />
        <InputContainer
          label="Ảnh bìa"
          inputType="singleImage"
          name="cover"
          control={form.control}
        />
        <InputContainer
          label="Tác giả"
          inputType="selectGroup"
          name="authors"
          options={[]}
          control={form.control}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
