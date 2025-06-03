import { useEffect } from 'react'
import { useItemsStore } from '../store/itemsStore'
import SortableList from './SortableList'
import { IItem } from '../store/itemsStore'
import { nanoid } from 'nanoid'

const defaultItems: IItem[] = [
  { id: nanoid(), name: 'Google', children: [] },
  {
    id: nanoid(), name: 'Youtube',
    children: [
      { id: nanoid(), name: 'Get Users', children: [] },
      {
        id: nanoid(), name: 'Users',
        children: [
          { id: nanoid(), name: 'Get Id', children: [] },
          { id: nanoid(), name: 'Get Access Token', children: [] },
        ],
      },
    ],
  },
  { id: nanoid(), name: 'Google Maps', children: [] },
  {
    id: nanoid(), name: 'AWS',
    children: [
      { id: nanoid(), name: 'Get EC2 List', children: [] },
      { id: nanoid(), name: 'Get RDS List', children: [] },
    ],
  },
  { id: nanoid(), name: 'Discord', children: [] },
  { id: nanoid(), name: 'Telegram', children: [] },
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
