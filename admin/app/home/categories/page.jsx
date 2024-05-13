import { index } from "@/app/help/base";
import BaseIndex from "@/app/components/base/baseIndex";
import { parseQueryString } from "@/app/help/uitilies";

export default async function BookIndex({ searchParams }) {
  const resource = "categories";
  const queryString = parseQueryString(searchParams);
  const { data, page, page_size } = await index(resource, queryString);

  const columns = [
    {
      id: "id",
      accessorKey: "id",
      header: "Id",
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Name",
    },
    {
      id: "des",
      accessorKey: "des",
      header: "Description",
    },
  ];

  return (
    <section>
      <BaseIndex
        resource={resource}
        title="Categories"
        columns={columns}
        entities={data}
        page={page}
        page_size={page_size}
      ></BaseIndex>
    </section>
  );
}
