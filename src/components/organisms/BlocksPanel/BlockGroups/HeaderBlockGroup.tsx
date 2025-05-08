// src/components/organisms/BlocksPanel/BlockGroups/HeaderBlockGroup.tsx
import BlockGroupWrapper from "../../../molecules/BlockGroupWrapper/BlockGroupWrapper";
import DraggableBlock from "../../../molecules/DraggableBlock/DraggableBlock";

export default function HeaderBlockGroup() {
  return (
    <BlockGroupWrapper title="Header Blocks">
      <DraggableBlock id="header-1" />
      <DraggableBlock id="header-2" />
      <DraggableBlock id="header-3" />
    </BlockGroupWrapper>
  );
}
