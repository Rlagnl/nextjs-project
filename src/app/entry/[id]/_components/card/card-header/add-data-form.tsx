"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { createData } from "@services/client";
import { Button } from "@components/ui/button";
import { toast } from "sonner";

export interface IAddDataFormProps {
  onSuccess?: () => void;
}

export function AddDataForm(props: IAddDataFormProps) {
  const { onSuccess } = props;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [id, setId] = useState<string>("");
  const [createdAtLocal, setCreatedAtLocal] = useState<string>("");

  const canSubmit = useMemo(() => {
    const trimmedId = id.trim();
    if (!trimmedId) {
      return false;
    }
    const trimmedCreatedAt = createdAtLocal.trim();
    if (!trimmedCreatedAt) {
      return false;
    }
    return !Number.isNaN(Date.parse(trimmedCreatedAt));
  }, [createdAtLocal, id]);

  const onCreate = async () => {
    if (isPending) {
      return;
    }

    const createdAtIso = new Date(createdAtLocal.trim()).toISOString();
    const payload = {
      id: id.trim(),
      created_at: createdAtIso,
    };

    const json = await createData(payload);

    if (!json.ok) {
      toast.error(json.error);
      return;
    }

    toast.success("新增成功");
    setId("");
    setCreatedAtLocal("");
    router.refresh();
    onSuccess?.();
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
        <input
          value={id}
          onChange={(event) => setId(event.target.value)}
          placeholder="id（必填）"
          disabled={isPending}
          className="h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground hover:border-ring/40 focus-visible:ring-1 focus-visible:ring-ring"
        />
        <input
          value={createdAtLocal}
          onChange={(event) => setCreatedAtLocal(event.target.value)}
          type="datetime-local"
          step={1}
          placeholder="created_at（必填）"
          disabled={isPending}
          className="h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground hover:border-ring/40 focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          variant="default"
          disabled={!canSubmit || isPending}
          onClick={() => startTransition(onCreate)}
          className="min-w-[140px]"
        >
          {isPending ? "新增中..." : "新增"}
        </Button>
      </div>
    </div>
  );
}
