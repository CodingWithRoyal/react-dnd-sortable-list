import { create } from 'zustand'

export interface IItem {
  id: string
  children?: IItem[]
}

export type IFlattenedItem = IItem & { ancestorIds: string[] }

interface IItemsStore {
  items: IItem[]
  addItem: (item: IItem) => void
  setItems: (items: IItem[]) => void
  updateItem: (id: string, data: Partial<IItem>) => void
}

function updateRecursive(items: IItem[], id: string, data: Partial<IItem>) {
  return items.map((item): IItem => {
    if (item.id === id) {
      return { ...item, ...data }
    }
    if (item.children?.length && item.id !== id) {
      return {...item, children: updateRecursive(item.children, id, data)}
    }
    return item
  })
}

export const useItemsStore = create<IItemsStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    return
  },
  setItems: (items) => set({ items }),
  updateItem: (id, data) => {
    get().setItems(updateRecursive(get().items, id, data))
  },
}))
