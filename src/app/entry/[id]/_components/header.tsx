import Link from "next/link";
import { Hash, MoveLeft } from "lucide-react";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";

export interface IEntryHeaderProps {
  id: string;
}

export function EntryHeader(props: IEntryHeaderProps) {
  const { id } = props;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="gap-1.5">
              <Hash className="size-3.5" />
              Entry
            </Badge>
            <div className="text-balance font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              {id}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/" className="gap-2">
              <MoveLeft className="size-4" />
              回首页
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
