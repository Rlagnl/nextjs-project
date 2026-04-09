export interface ICreateDataPayload {
  id: string;
  created_at: string;
}

export type CreateDataResponseType =
  | { ok: true; data: unknown }
  | { ok: false; error: string };

export interface IDeleteDataPayload {
  id: string;
}

export type DeleteDataResponseType =
  | { ok: true; data: unknown }
  | { ok: false; error: string };

export async function createData(
  payload: ICreateDataPayload,
): Promise<CreateDataResponseType> {
  let res: Response;
  try {
    res = await fetch("/api/data", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, error: "网络错误：无法请求 /api/data" };
  }

  const json = (await res
    .json()
    .catch(() => null)) as CreateDataResponseType | null;
  if (!json) {
    return { ok: false, error: "服务返回异常" };
  }

  return json;
}

export async function deleteData(
  payload: IDeleteDataPayload,
): Promise<DeleteDataResponseType> {
  let res: Response;
  try {
    res = await fetch(`/api/data?id=${encodeURIComponent(payload.id)}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
  } catch {
    return { ok: false, error: "网络错误：无法请求 /api/data" };
  }

  const json = (await res
    .json()
    .catch(() => null)) as DeleteDataResponseType | null;
  if (!json) {
    return { ok: false, error: "服务返回异常" };
  }

  return json;
}
