import { useEffect } from 'react'
import { useItemsStore } from '../store/itemsStore'
import SortableList from './SortableList'
import { IItem } from '../store/itemsStore'

const defaultItems: IItem[] = [
  { id: 'Google', children: [] },
  {
    id: 'Youtube',
    children: [
      { id: 'Get Users', children: [] },
      {
        id: 'Users',
        children: [
          { id: 'Get Id', children: [] },
          { id: 'Get Access Token', children: [] },
        ],
      },
    ],
  },
  { id: 'Google Maps', children: [] },
  {
    id: 'AWS',
    children: [
      { id: 'Get EC2 List', children: [] },
      { id: 'Get RDS List', children: [] },
    ],
  },
  { id: 'Discord', children: [] },
  { id: 'Telegram', children: [] },
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
