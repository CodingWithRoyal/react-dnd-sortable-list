import { create } from 'zustand'

export interface IItem {
  id: string
  children?: IItem[]
}

export type IFlattenedItem = IItem & { ancestorIds: string[] }

interface IItemsStore {
  items: IItem[]
  setItems: (items: IItem[]) => void
  updateItem: (id: string, data: Partial<IItem>) => void
}

export const useItemsStore = create<IItemsStore>((set, get) => ({
  items: [],
  setItems: (items) => set({ items }),
  updateItem: (id, data) => {
    const updated = get().items.map((item) =>
      item.id === id ? { ...item, ...data } : item
    )
    get().setItems(updated)
  },
}))
