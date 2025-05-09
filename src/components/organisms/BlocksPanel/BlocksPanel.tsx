import HeaderBlockGroup from "./BlockGroups/HeaderBlockGroup";
import DraggableBlock from "../../molecules/DraggableBlock/DraggableBlock";

export default function BlocksPanel() {
  return (
    <div>
      <HeaderBlockGroup />
      <DraggableBlock id="hero-1" data={{ type: "hero", variant: "hero-1" }} />
      <DraggableBlock id="feature-1" data={{ type: "feature", variant: "feature-1" }} />
      <DraggableBlock id="button-1" data={{ type: "button", variant: "button-1" }} />
    </div>
  );
}
