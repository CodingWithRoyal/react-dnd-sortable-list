import { IFlattenedItem } from '../store/itemsStore'

export function flatten(items: IFlattenedItem[]): IFlattenedItem[] {
  return items.reduce<IFlattenedItem[]>((acc, item) => {
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

const COLORS_MAP: Record<string, string> = {}
export function getRandomColor(id: string) {
  if (COLORS_MAP[id]) return COLORS_MAP[id]
  COLORS_MAP[id] = '#' + Math.floor(Math.random() * 16777215).toString(16)
  return COLORS_MAP[id]
}
export function getRandomDarkColor(id: string): string {
  if (COLORS_MAP[id]) return COLORS_MAP[id]

  const getDarkChannel = () => Math.floor(Math.random() * 128) // 0–127 range

  const r = getDarkChannel()
  const g = getDarkChannel()
  const b = getDarkChannel()

  const hex = `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')}`

  COLORS_MAP[id] = hex
  return hex
}
