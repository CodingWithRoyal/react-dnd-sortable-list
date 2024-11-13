import { create } from 'zustand'

export interface IItem {
  id: string
  children?: IItem[]
}

export type IFlattenedItem = IItem & { ancestorIds: string[] }

interface IItemsStore {
  items: IItem[]
  setItems: (items: IItem[]) => void
}

export const useItemsStore = create<IItemsStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}))
