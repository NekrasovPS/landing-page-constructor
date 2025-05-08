// src/components/organisms/BlocksPanel/BlocksPanel.tsx
import HeaderBlockGroup from "./BlockGroups/HeaderBlockGroup";
import DraggableBlock from "../../molecules/DraggableBlock/DraggableBlock";

export default function BlocksPanel() {
  return (
    <div>
      <HeaderBlockGroup />

      <div style={{ marginTop: "24px" }}>
        <h4>Basic Blocks</h4>
        <DraggableBlock id="block-1" />
        <DraggableBlock id="block-2" />
        <DraggableBlock id="block-3" />
      </div>
    </div>
  );
}
