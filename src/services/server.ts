import { fetchData } from "@utils/fetch-server";

export interface IDataRow {
  id: number;
  created_at: string;
}

export async function getListData(limit = 20): Promise<IDataRow[]> {
  const res = await fetchData<IDataRow>(`/api/data?limit=${limit}`);
  return res.ok ? res.data : [];
}

