// src/components/organisms/BlocksPanel/BlockGroups/HeaderBlockGroup.tsx
import BlockGroupWrapper from "../../../molecules/BlockGroupWrapper/BlockGroupWrapper";
import DraggableBlock from "../../../molecules/DraggableBlock/DraggableBlock";

export default function HeaderBlockGroup() {
  return (
    <BlockGroupWrapper title="Header Blocks">
      <DraggableBlock id="header-1" data={{ type: "header", variant: "header-1" }} />
    </BlockGroupWrapper>
  );
}
