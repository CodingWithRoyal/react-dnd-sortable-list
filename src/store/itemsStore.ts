import { nanoid } from 'nanoid'
import { Children } from 'react'
import { create } from 'zustand'

export interface IItem {
  id: string
  name: string
  children?: IItem[]
}

export type IFlattenedItem = IItem & { ancestorIds: string[] }

interface IItemsStore {
  items: IItem[]
  addItem: (item: IItem, ancestorIds: string) => void
  setItems: (items: IItem[]) => void
  updateItem: (id: string, data: Partial<IItem>) => void
  removeItem: (id: string) => void
}

function removeRecursive(items: IItem[], id: string): IItem[] {
  return items
  .filter(item => item.id !== id)
  .map(item => ({...item, children: removeRecursive(item.children || [], id)}))
}

function updateRecursive(items: IItem[], id: string, data: Partial<IItem>): IItem[] {
  return items.map((item): IItem => {
    if (item.id === id) {
      return { ...item, ...data }
    } else if (item.children) {
      return {...item, children: updateRecursive(item.children, id, data)}
    }
    return item
  })
}

function setNewId(items: IItem[]) {
  return items.map( (item): IItem => {
    return { ...item, id: nanoid(), children: setNewId(item.children || []) }
  })
}

function addRecursive(items: IItem[], item: IItem, ancestorId: string): IItem[] {
  if (ancestorId === 'root') {
    return [...items || [], item]
  }

  return items.map((i): IItem => {
    if (ancestorId == i.id) {
      return { ...i, children: [...(i.children || []), item] }
    } else if (item.children) {
      return {...i, children: addRecursive((i.children || []), item, ancestorId)}
    }
    return i
  })
}

export const useItemsStore = create<IItemsStore>((set, get) => ({
  items: [],
  addItem: (item, ancestorId) => {
    item = setNewId([item])[0]
    const itemList = addRecursive(get().items, item, ancestorId)
    console.log(itemList)
    get().setItems(itemList)
  },
  setItems: (items) => set({ items }),
  updateItem: (id, data) => {
    const itemList = updateRecursive(get().items, id, data)
    get().setItems(itemList)
  },
  removeItem: (id) => {
    const itemList = removeRecursive(get().items, id)
    get().setItems(itemList)
  }
}))
