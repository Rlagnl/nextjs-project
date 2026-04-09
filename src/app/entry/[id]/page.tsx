import { EntryHeader } from "@/entry/[id]/_components/header";
import { DataCard } from "@/entry/[id]/_components/card/data-card";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { filters } = await searchParams;
  const limit = 20;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-6">
        <EntryHeader id={id} />
        <DataCard limit={limit} />
      </div>
    </main>
  );
}
