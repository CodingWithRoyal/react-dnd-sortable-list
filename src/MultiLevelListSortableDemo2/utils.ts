import { IItem } from '.'

export function flatten(items: IItem[]): IItem[] {
  return items.reduce<IItem[]>((acc, item) => {
    acc.push(item)
    if (item.children) {
      const children = item.children.map((i) => ({
        ...i,
        ancestorIds: [...(item.ancestorIds || []), item.id], // add ancestorIds
      }))
      acc.push(...flatten(children))
    }
    return acc
  }, [])
}
