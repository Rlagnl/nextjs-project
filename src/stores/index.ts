import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface IStoreState {
  selectedId: string | null;
  isDeleting: boolean;
}

interface IStoreActions {
  addSelectedId: (id: string | null) => void;
  removeSelectedId: () => void;
  startDeleting: () => void;
  endDeleting: () => void;
}

export type IStore = IStoreState & IStoreActions;

const useStore = create(
  subscribeWithSelector<IStore>((set, get) => ({
    selectedId: null,
    isDeleting: false,
    addSelectedId: (id) => set(() => ({ selectedId: id })),
    removeSelectedId: () => set(() => ({ selectedId: null })),
    startDeleting: () => set(() => ({ isDeleting: true })),
    endDeleting: () => set(() => ({ isDeleting: false })),
  })),
);

useStore.subscribe(
  (state) => state.selectedId,
  (state, preState) => {
    console.log("新数据:", state, "旧数据:", preState);
  },
);

export default useStore;
