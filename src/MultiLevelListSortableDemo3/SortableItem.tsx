import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useItemsStore, IFlattenedItem } from '../store/itemsStore'
import { getRandomColor } from './utils'
import { Icon } from '@iconify/react'

export default function SortableItem(props: { item: IFlattenedItem }) {
  const { item } = props
  const { ancestorIds } = item
  const ancestorIdsLength = item.ancestorIds?.length || 0
  const { updateItem } = useItemsStore()

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({ id: item.id, data: { ancestorIds } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #ccc',
    padding: '0 8px',
    margin: '8px 4px',
    background: 'white',
    boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
    // borderRadius: '8px',
    color: getRandomColor(item.id),
  }

  function makeid(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

  function rename(id: string): void {
    let newName = prompt('New Name?');
    if (!newName) newName = id
    updateItem(id, {id: newName})
  }

  function duplicate(id: string): void {
    console.log('duplicate: '+id)
  }

  function remove(id: string): void {
    console.log('remove: '+id)
  }

  return (
    <div ref={setNodeRef} style={{...style, display: 'flex', alignItems: 'center'}}>
      <p style={{ paddingLeft: `${ancestorIdsLength * 20}px` }}>
        {item.id}
      </p>
      <div style={{ flexGrow: 1, textAlign: 'end' }}>
        <Icon icon="material-symbols-light:drag-pan-rounded" width={24} height={24} ref={setActivatorNodeRef} {...attributes} {...listeners}/>
        <Icon icon="material-symbols-light:edit-square" width={24} height={24} onClick={() => rename(item.id)}/>
        <Icon icon="material-symbols-light:control-point-duplicate" width={24} height={24} onClick={() => duplicate(item.id)}/>
        <Icon icon="material-symbols-light:restore-from-trash-rounded" width={24} height={24} onClick={() => remove(item.id)}/>
      </div>
    </div>
  )
}
