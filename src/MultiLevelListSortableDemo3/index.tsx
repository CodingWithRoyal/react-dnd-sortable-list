import { useEffect } from 'react'
import { useItemsStore } from '../store/itemsStore'
import SortableList from './SortableList'
import { IItem } from '../store/itemsStore'

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
  { id: 'F', children: [] },
]

export default function MultiLevelListSortableDemo() {
  const setItems = useItemsStore((state) => state.setItems)
  useEffect(() => {
    setItems(defaultItems)
  })

  return (
    <div style={{ width: '500px', margin: '40px auto' }}>
      <SortableList />
    </div>
  )
}
