import { getListData } from "@services/index";
import { parseISO, format } from "date-fns";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { filters } = await searchParams;

  const data = await getListData(20);

  return (
    <div>
      <div>
        {id} - {filters}
      </div>
      <div>
        {data.map(({ id, created_at }) => (
          <div key={id}>
            {id} - {format(parseISO(created_at), "LLLL d, yyyy")}
          </div>
        ))}
      </div>
    </div>
  );
}
