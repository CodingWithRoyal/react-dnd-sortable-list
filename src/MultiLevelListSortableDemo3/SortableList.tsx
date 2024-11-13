import { useMemo } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  // arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import SortableItem from './SortableItem'
import { useItemsStore, IFlattenedItem } from '../store/itemsStore'
import { flatten } from './utils'
import genNewItems from './genNewItems'

export default function SortableList() {
  const items = useItemsStore((state) => state.items)
  const setItems = useItemsStore((state) => state.setItems)
  const flattenedItems = useMemo(
    () => flatten(items as IFlattenedItem[]),
    [items]
  )
  // console.log('flattenedItems', flattenedItems)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over == null) return
    if (active.id === over.id) return

    const { ancestorIds: overAncestorIds = [] } = over.data.current || {}
    // const { ancestorIds: activeAncestorIds = [] } = active.data.current || {}
    if (overAncestorIds.includes(active.id)) {
      console.log('Cannot drop item into its descendant')
      return
    }
    console.log('handleDragEnd', active.id, over.id)
    const newItems = genNewItems(
      items,
      flattenedItems,
      active.id.toString(),
      over.id.toString()
    )
    console.log('newItems...', newItems)
    setItems(newItems)
  }

  if (flattenedItems.length === 0) return null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={flattenedItems}
        strategy={verticalListSortingStrategy}
      >
        {flattenedItems.length &&
          flattenedItems.map((i) => <SortableItem key={i.id} item={i} />)}
      </SortableContext>
    </DndContext>
  )
}
