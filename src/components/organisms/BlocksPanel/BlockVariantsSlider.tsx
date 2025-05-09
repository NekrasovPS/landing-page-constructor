import DraggableBlock from "../../molecules/DraggableBlock/DraggableBlock";

import styles from "./BlockVariantsSlider.module.css";

interface Props {
  isOpen: boolean;
  title: string;
  blocks: { id: string; type: string; variant: string }[];
  onClose: () => void;
}

export default function BlockVariantsSlider({ isOpen, title, blocks, onClose }: Props) {
  return (
<div
  className={`${styles.wrapper} ${isOpen ? styles.open : styles.closed}`}
  style={{ width: "260px" }} // ← фиксированная ширина
>

      <div className={styles.header}>
        <strong>{title}</strong>
        <button onClick={onClose}>✕</button>
      </div>

      {blocks.map((block) => (
        <DraggableBlock
          key={block.id}
          id={block.id}
          data={{ type: block.type, variant: block.variant }}
        />
      ))}
    </div>
  );
}