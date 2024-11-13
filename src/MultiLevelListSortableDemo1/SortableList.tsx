// import { useState } from 'react'
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
import SortableItem from './SortableItem'
import { IItem } from './index'

export default function SortableList(props: { items: IItem[] }) {
  const { items } = props

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over == null) return

    console.log('handleDragEnd', active.id, over.id)
    // if (active.id !== over.id) {
    //   setItems((items) => {
    //     const oldIndex = items.findIndex((i) => i.id === active.id)
    //     const newIndex = items.findIndex((i) => i.id === over.id)

    //     return arrayMove(items, oldIndex, newIndex)
    //   })
    // }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((i) => (
          <SortableItem key={i.id} item={i} />
        ))}
      </SortableContext>
    </DndContext>
  )
}
