"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@components/ui/button";
import { CardActionsAddButton } from "./card-actions-add-button";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { toast } from "sonner";
import { deleteData } from "@services/client";
import useStore from "@stores/index";

export function CardActions() {
  const {
    selectedId,
    isDeleting,
    removeSelectedId,
    startDeleting,
    endDeleting,
  } = useStore(
    useShallow((state) => ({
      selectedId: state.selectedId,
      isDeleting: state.isDeleting,
      removeSelectedId: state.removeSelectedId,
      startDeleting: state.startDeleting,
      endDeleting: state.endDeleting,
    })),
  );

  const router = useRouter();

  const onDelete = async () => {
    if (!selectedId || isDeleting) {
      return;
    }

    startDeleting();
    try {
      const res = await deleteData({ id: selectedId });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }

      toast.success("删除成功");
      removeSelectedId();
      router.refresh();
    } catch (error) {
      toast.error("删除失败");
    } finally {
      endDeleting();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="destructive"
        size="sm"
        className="gap-2 transition-shadow hover:shadow-sm disabled:cursor-not-allowed"
        disabled={!selectedId || isDeleting}
        onClick={onDelete}
      >
        <Trash2 className="size-4" />
        删除{!!isDeleting && <span className="mr-2 animate-spin">⏳</span>}
      </Button>
      <CardActionsAddButton />
    </div>
  );
}
