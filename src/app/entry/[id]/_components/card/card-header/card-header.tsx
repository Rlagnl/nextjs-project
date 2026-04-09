import { Calendar } from "lucide-react";
import { Badge } from "@components/ui/badge";
import {
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { CardActions } from "@/entry/[id]/_components/card/card-header/card-actions";

export interface IDataCardHeaderProps {
  count: number;
  limit: number;
}

export function DataCardHeader(props: IDataCardHeaderProps) {
  const { count, limit } = props;

  return (
    <CardHeader className="border-b border-border/60">
      <CardTitle className="flex items-center gap-2">
        <Calendar className="size-4 text-muted-foreground" />
        最近数据
      </CardTitle>
      <CardDescription>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>
            本次已加载{" "}
            <span className="font-medium text-foreground">{count}</span> 条
          </span>
          <span className="text-foreground/30">/</span>
          <span className="inline-flex items-center gap-2">
            <span>最多加载</span>
            <Badge variant="secondary" className="font-normal">
              {limit} 条
            </Badge>
          </span>
        </div>
      </CardDescription>
      <CardAction>
        <CardActions />
      </CardAction>
    </CardHeader>
  );
}
