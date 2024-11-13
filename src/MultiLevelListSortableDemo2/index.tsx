import { useState } from 'react'
import SortableList from './SortableList'
import { flatten } from './utils'

export interface IItem {
  id: string
  ancestorIds?: string[]
  children?: IItem[]
}

const defaultItems: IItem[] = [
  { id: 'A', children: [] },
  {
    id: 'B',
    children: [
      { id: 'B1', children: [] },
      {
        id: 'B2',
        children: [
          { id: 'B2a', children: [] },
          { id: 'B2b', children: [] },
        ],
      },
    ],
  },
  { id: 'C', children: [] },
  {
    id: 'D',
    children: [
      { id: 'D1', children: [] },
      { id: 'D2', children: [] },
    ],
  },
  { id: 'E', children: [] },
]

// flatten, and add ancestorIds
const flattenItems = flatten(defaultItems)
// console.log('flattenItems', flattenItems)

export default function MultiLevelListSortableDemo() {
  const [items] = useState<IItem[]>(flattenItems)

  return (
    <div style={{ width: '500px', margin: '40px auto' }}>
      <SortableList items={items} />
    </div>
  )
}
