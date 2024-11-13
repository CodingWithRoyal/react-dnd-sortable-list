import { useState } from 'react'
import {
  DndContext,
  useDroppable,
  useDraggable,
  DragEndEvent,
} from '@dnd-kit/core'

export default function BasicDemo() {
  const containers = ['A', 'B', 'C']
  const [parent, setParent] = useState(null)
  const draggableMarkup = <Draggable>Drag me</Draggable>

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event
    console.log('active:', active)
    console.log('over:', over)

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          {parent === id ? draggableMarkup : `Drop here ${id}`}
        </Droppable>
      ))}
    </DndContext>
  )

  // const [isDropped, setIsDropped] = useState(false)
  // const draggableMarkup = <Draggable>Drag me</Draggable>

  // function handleDragEnd(event: DragEndEvent) {
  //   const { over, active } = event
  //   console.log('over:', over)
  //   console.log('active:', active)

  //   if (over && over.id === 'droppable') {
  //     setIsDropped(true)
  //   }
  // }

  // return (
  //   <DndContext onDragEnd={handleDragEnd}>
  //     {!isDropped ? draggableMarkup : null}
  //     <Droppable id="droppable">
  //       {isDropped ? draggableMarkup : 'Drop here'}
  //     </Droppable>
  //   </DndContext>
  // )
}

function Droppable(props: { children: React.ReactNode; id: string }) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: { foo: 'bar1' },
  })
  const style = {
    color: isOver ? 'green' : undefined,
  }

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  )
}

function Draggable(props: { children: React.ReactNode }) {
  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id: 'draggable',
    data: {
      foo: 'bar',
    },
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  )
}
