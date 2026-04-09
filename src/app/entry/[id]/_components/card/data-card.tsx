import { getListData } from "@services/server";
import { Card, CardContent, CardFooter } from "@components/ui/card";
import { DataCardHeader } from "@/entry/[id]/_components/card/card-header/card-header";
import { DataList } from "@/entry/[id]/_components/card/data-list";
import { EmptyState } from "@/entry/[id]/_components/card/empty-state";
import type { IDataCardProps } from "@/entry/[id]/_types/data-types";

export async function DataCard(props: IDataCardProps) {
  const { limit } = props;
  const data = await getListData(limit);

  return (
    <Card>
      <DataCardHeader count={data.length} limit={limit} />

      <CardContent>
        {data.length === 0 ? <EmptyState /> : <DataList data={data} />}
      </CardContent>

      <CardFooter className="border-t border-border/60">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted-foreground">
            这是一个基于 shadcn 的详情页布局示例：强调层级、留白与可读性。
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
