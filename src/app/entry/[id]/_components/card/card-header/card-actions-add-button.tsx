"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@components/ui/button";
import { AddDataForm } from "@/entry/[id]/_components/card/card-header/add-data-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import useStore from "@stores/index";

export function CardActionsAddButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isDeleting = useStore((state) => state.isDeleting);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="gap-2 transition-shadow hover:shadow-sm disabled:cursor-not-allowed"
          disabled={isDeleting}
        >
          <Plus className="size-4" />
          新增
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新增一条数据</DialogTitle>
          <DialogDescription>
            填写 id 与创建时间，提交后会写入 Supabase 并刷新列表。
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <AddDataForm onSuccess={() => setIsOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
