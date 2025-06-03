import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useItemsStore, IFlattenedItem } from "../store/itemsStore";
import { getRandomDarkColor } from "./utils";
import { Icon } from "@iconify/react";
import { nanoid } from "nanoid";
import { useState } from "react";

export default function SortableItem(props: { item: IFlattenedItem }) {
  const { item } = props;
  const { id, name, ancestorIds } = item;
  const ancestorIdsLength = item.ancestorIds?.length || 0;
  const { addItem, updateItem, removeItem } = useItemsStore();
  const [hover, setHover] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: id, data: { ancestorIds } });

  const lineHeight = '40px'

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // border: "1px solid #ccc",
    padding: "0 8px",
    background: !hover ? 'white' : '#eee',
    boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
    // borderRadius: '8px',
    color: getRandomDarkColor(id),
    height: lineHeight,
  };

  function rename(id: string): void {
    let newName = prompt("New Name?");
    if (!newName) newName = name;
    updateItem(id, { name: newName });
  }

  function duplicate(id: string): void {
    addItem(
      item,
      ancestorIdsLength > 0 ? ancestorIds[ancestorIdsLength - 1] : "root"
    );
  }

  function remove(id: string): void {
    removeItem(id)
  }

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, display: "flex", alignItems: "center", userSelect: 'none' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onDoubleClick={() => { rename(id) }}
    >
      { (ancestorIds && ancestorIds.length > 0) && ancestorIds.map((i) => {return <div key={nanoid()} style={{ borderLeft: '1px solid #ccc', width: '20px', height: lineHeight }}></div>}) }
      <p ref={setActivatorNodeRef} {...attributes} {...listeners} style={{ paddingLeft: `0`, flexGrow: 1 }}>{name}</p>
      <div style={{ textAlign: "end" }}>
        {/* <Icon
          icon="material-symbols-light:drag-pan-rounded"
          width={24}
          height={24}
          ref={setActivatorNodeRef} {...attributes} {...listeners}
        />
        <Icon
          icon="material-symbols-light:edit-square"
          width={24}
          height={24}
          onClick={() => rename(id)}
        /> */}
        <Icon
          icon="material-symbols-light:control-point-duplicate"
          width={24}
          height={24}
          onClick={() => duplicate(id)}
        />
        <Icon
          icon="material-symbols-light:restore-from-trash-rounded"
          width={24}
          height={24}
          onClick={() => remove(id)}
        />
      </div>
    </div>
  );
}
