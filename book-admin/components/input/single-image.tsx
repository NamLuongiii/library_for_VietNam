import { X } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { FileUploader } from "react-drag-drop-files";
import { FieldValues } from "react-hook-form";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Text } from "../ui/text";
import { SingleImageProps } from "./types/types";

export function SingleImage<T extends FieldValues>({
  name,
  control,
  accept,
  label,
}: SingleImageProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <FileUploader
              classes="block border-2 border-border border-dashed p-4 rounded-sm text-center"
              name="file"
              handleChange={field.onChange}
              types={["png", "jpeg"]}
            >
              <Text size="sm" variant="emphased">
                Kéo & thả ảnh vào đây
              </Text>
              <Button variant="outline">Hoặc chọn từ filesystem</Button>
            </FileUploader>
          </FormControl>
          {field.value && (
            <Preview
              file={field.value}
              onRemove={() => field.onChange(undefined)}
            />
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

const Preview = ({ file, onRemove }: { file: File; onRemove: () => void }) => {
  const url = URL.createObjectURL(file);
  return (
    <div>
      <div
        className="w-40 aspect-square object-cover bg-center bg-cover border border-border"
        style={{
          backgroundImage: `url(${url})`,
        }}
      >
        <Button type="button" size="icon" onClick={onRemove}>
          <X />
        </Button>
      </div>
      <Text
        size={"sm"}
        className="max-h-44 text-wrap line-clamp-2 overflow-hidden"
      >
        ({prettyBytes(file.size)}) {file.name}
      </Text>
    </div>
  );
};
