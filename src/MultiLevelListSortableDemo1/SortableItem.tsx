import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import SortableList from './SortableList'
import { IItem } from './index'

export default function SortableItem(props: { item: IItem }) {
  const { item } = props
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #ccc',
    padding: '0 8px',
    margin: '8px 4px',
    background: 'white',
    boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <p>Item {item.id}</p>

      {item.children && (
        <div style={{ marginLeft: '20px' }}>
          <SortableList items={item.children} />
        </div>
      )}
    </div>
  )
}
