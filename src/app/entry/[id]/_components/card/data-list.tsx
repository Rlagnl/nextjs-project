"use client";

import { useShallow } from "zustand/react/shallow";
import { parseISO, format } from "date-fns";
import { Hash } from "lucide-react";
import useStore from "@stores/index";
import { cn } from "@lib/utils";
import { Badge } from "@components/ui/badge";
import type { IDataRow } from "@services/server";

export interface IDataListProps {
  data: IDataRow[];
}

export function DataList(props: IDataListProps) {
  const { data } = props;

  const { selectedId, isDeleting, setSelectedId, removeSelectedId } = useStore(
    useShallow((state) => ({
      selectedId: state.selectedId,
      isDeleting: state.isDeleting,
      setSelectedId: state.addSelectedId,
      removeSelectedId: state.removeSelectedId,
    })),
  );

  return (
    <div className="divide-y divide-border/60 overflow-hidden rounded-3xl border border-border bg-background">
      {data.map(({ id, created_at }) => {
        const rowIdText = String(id);
        const createdAt = format(parseISO(created_at), "LLLL d, yyyy");
        const isSelected = selectedId === rowIdText;

        return (
          <div
            key={rowIdText}
            role={isDeleting ? "presentation" : "button"}
            tabIndex={isDeleting ? -1 : 0}
            aria-pressed={isSelected}
            onClick={() => {
              if (isDeleting) return;
              if (isSelected) {
                removeSelectedId();
              } else {
                setSelectedId(rowIdText);
              }
            }}
            onKeyDown={(event) => {
              if (!isDeleting && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                if (isSelected) {
                  removeSelectedId();
                } else {
                  setSelectedId(rowIdText);
                }
              }
            }}
            className={cn(
              "flex flex-col gap-2 px-4 py-4 outline-none transition-colors",
              !isDeleting && "cursor-pointer hover:bg-muted/40",
              !isDeleting &&
                "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isSelected
                ? "bg-primary/5 ring-1 ring-primary/30 dark:ring-primary/40"
                : "",
              isDeleting && "opacity-60",
              "sm:flex-row sm:items-center sm:justify-between sm:gap-6",
            )}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Hash className="size-4 text-muted-foreground" />
                <div className="truncate font-medium">{rowIdText}</div>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Created at
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <div className="text-sm text-muted-foreground">{createdAt}</div>
              <Badge variant="outline" className="shrink-0">
                {rowIdText.slice(0, 6)}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}
